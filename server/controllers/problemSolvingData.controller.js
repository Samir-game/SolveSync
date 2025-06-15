const axios= require("axios");

const problemSolvingData= async(req,res)=>{
    const {cfHandle,days}= req.query;

    if(!cfHandle || !days){
        return res.status(400).json({
            message: "Missing parameters(cfHandle,days)",
        });
    }

    const filterPeriod= Date.now() - days*24*60*60*1000;

    try {
        const response= await axios.get(`https://codeforces.com/api/user.status?handle=${cfHandle}`);

        //all type of submission done by student till date
        const allSubmissions= response.data.result;

        //all type of submission done by student with the filter period
        const filteredSubmissions= allSubmissions.filter(sub=>{
            return sub.creationTimeSeconds*1000 >=filterPeriod;
        });

        // solved problems in that period
        const solvedSubmissions= filteredSubmissions.filter(
            fsub=>fsub.verdict === "OK");

        // unique problems solved by user
        const uniqueSolvedProblems= {};
        solvedSubmissions.forEach(ssub=>{
            const problem= ssub.problem;
            const key= `${problem.contestId}-${problem.index}`;
            if (!uniqueSolvedProblems[key]) {
                uniqueSolvedProblems[key]= problem;
            }
        });

        const uniqueSolved= Object.values(uniqueSolvedProblems);
        const totalProblemSolved= uniqueSolved.length;

        let mostRating= 0;
        let sumRating= 0;
        let ratedCount= 0;

        // making an object that will have every rating bucket
        const ratingBucket={}; 
        for(let i=800;i<=3500;i+=100){
            ratingBucket[i]=0;
        }

        // calculating sumRating,mostRating and ratingBucket
        uniqueSolved.forEach(us=>{
            if(us.rating){
                sumRating+=us.rating;
                ratedCount++;
                if(us.rating >mostRating){
                    mostRating= us.rating;
                }

                const problemBucket=Math.floor(us.rating/100)*100;
                ratingBucket[problemBucket]++;
            }
        });

        const averageRating= (sumRating/ratedCount).toFixed(2);
        const problemSolvedPerday= (totalProblemSolved/days).toFixed(2);

        const solvedHeap={};
        solvedSubmissions.forEach(ss=>{
            const problem_date=new Date(ss.creationTimeSeconds*1000).toISOString().slice(0,10);
            // i want first 10 charcter thats why slice 0,10
            if(!solvedHeap[problem_date]){
                solvedHeap[problem_date]=1;
            }else{
                solvedHeap[problem_date]++;
            }
        })

        return res.status(200).json({
            totalProblemSolved,
            mostDifficultProblem: mostRating,
            averageRating,
            problemSolvedPerday,
            ratingBucket,
            solvedHeap
        });

    } catch (error) {
        console.error("Error Fetching CodeForces Data", error.message);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
    }
};

module.exports={
    problemSolvingData
};
