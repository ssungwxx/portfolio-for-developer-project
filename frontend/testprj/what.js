const getUser = id => {
    const users = [
        {id: 1, githubID: "eduyu"},
        {id: 2, githubID: "edujohn"},
    ];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.id === id);
            if (user) {
                // console.log(user);
                resolve(user)
            } else reject(new Error(`Can not find user with id ${id}`))
        }, 2000);
    });
};

// const getRepos = user => {
//     const repos = ["TIL", "Workshop_HW", "Python", "JS"];
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (repos) {
//                 // console.log(repos);
//                 resolve(repos);
//             } else reject(new Error("ERROR!"))
//         }, 2000)
//
//     })
// };

async function getRepos () {
    const repos = ["J", "S"];

    return await new Promise((resolve, reject) => {
        if (repos) {
            resolve(repos)
        } else reject(new Error("ERROR!"))
    })
}

const getCommits = repo => {
    const commits = ["Init repo", "Make index.html"];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (commits) {
                // console.log(commits);
                resolve(commits);
            }
            else reject(new Error("ERROR"))
        }, 2000)
    });
};
// 비동기적(non-blocking) 요소가 있으면 앞에 async를 넣어준다.
// return이 Promise일 때만 가능
// 아래는 Promise.js 코드와 같음!
async function main() {
    try {
        // const user = await getUser(2);
        const repos = await getRepos("user");
        console.log(repos)
        const commits = await getCommits(repos[0]);
        console.log(commits.length);
    } catch (e) {
        console.error(e);
    }
}

main();