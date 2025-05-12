

[
    "PR_NUMBER", 
    "BRANCH_NAME", 
    "NETLIFY_SITE_ID", 
    "NETLIFY_TOKEN", 
    "UPDATED_AT",
    "COMMIT_SHA"
].forEach((v) => {
    if(!(process.env[v])){
        throw new Error(`Env var: '${v}' was not provided`)
    }
})
const {
    PR_NUMBER, 
    BRANCH_NAME, 
    NETLIFY_SITE_ID, 
    NETLIFY_TOKEN, 
    UPDATED_AT, 
    COMMIT_SHA
} = process.env; 

// 30 * 3000ms = 1.5 minutes
const MAX_NUM_TRIES = 30; 
const DELAY_TIME_MS = 6000; 

async function main() {

    let numTries = 0; 
    while (numTries <= MAX_NUM_TRIES) {
        numTries++; 
        await new Promise((res) => setTimeout(res, DELAY_TIME_MS))
        console.info(`Attempt #${numTries}`);

        let pageNum = 1;
        const result = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys?branch=${BRANCH_NAME}&page=${pageNum}`,{
            headers: {
                "Authorization" : `Bearer ${NETLIFY_TOKEN}`
            }
        }); 

        if(!result.ok){
            throw new Error(`Result was not ok: ${result.statusText}`)
        }

        const json = await result.json(); 

        if(json.length ===100){
            throw new Error("Result length was 100, you have there is probably another page of results")
        }

        const filteredResults = json.filter((v) => v.review_id === parseInt(PR_NUMBER) && v.commit_ref === COMMIT_SHA); 
        console.info(`Found ${filteredResults.length} results with matching review_id and commit_ref`); 


        const filteredResults2 = filteredResults.filter((v) => {
            return new Date(v.created_at) > new Date(UPDATED_AT); 
        })

        console.info(`Found ${filteredResults2.length} results with matching created_at greater than UPDATED_AT (${UPDATED_AT})`); 

        if(filteredResults2.length >1){
            throw new Error(`Expect only one deploy to exist, got ${filteredResults2.length}`)
        }

  
        if(filteredResults2.length ===0){
            console.info("No matching results, deploy isn't created yet."); 
            continue; 
        }

        const singleResult = filteredResults2[0]; 
        const resultStatus = singleResult.state; 

        console.info(`Result state is '${resultStatus}'`)

        if(resultStatus === "ready") {
            console.info(`Deploy URL: ${singleResult.deploy_ssl_url}`)
            process.exit(0); 
        }

        if(result.status ==="error"){
            throw new Error("Deploy had an error status")
        }
    }

    throw new Error("Maximum retries exceeded.")
}

main(); 
