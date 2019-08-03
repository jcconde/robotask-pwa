import { createGitgraph, templateExtend } from "@gitgraph/js";
/***********************
 *  CUSTOM TEMPLATES   *
 ***********************/
const options = {
    template: templateExtend("metro", {
        colors: ["#979797","#7170F1","#008fb5","#f1c109", "#F17529","#F14C63", "#1E01F1"],
        branch: {
            lineWidth: 4,
            labelRotation: 0,
            label: {
                display: true,
                font: 'normal 10px Tahoma'
            }
        },
        commit: {
            displayHash: false,
            spacing: 40,
            dot: {
                size: 4,
                strokeWidth: 4,
                // color: 'white'
            },
            message: {
                display: true,
                displayBranch: true,
                displayHash: false,
            },
            tooltipHTMLFormatter: function (commit) {
                return (commit.branch.name ? "[" + commit.branch.name + "] " : "") + commit.message;
            }
        },
        arrow: {
            size: 0,
            offset: 2.5
        }
    }),
    orientation: "horizontal",
    reverseArrow: false,
    // mode: 'compact'
};

const graphContainer = document.getElementById("gitgraph");
const gitgraph = createGitgraph(graphContainer, options);

const master = gitgraph.branch("master");
master.commit("Init the project");
master.commit("Add Magento Commerce");
master.commit("first deploy to production");

const staging = master.branch("staging");
staging.commit("others commit 1");
staging.commit("others commit 2");

const uat = master.branch("UAT");

/***********************
 *  Feature branch  *
 ***********************/
const fb1 = master.branch({
    name: "WW-901-modificar-shipping"
});
fb1.commit({
    subject: "WW-901 adding file1.php",
});
fb1.commit({
    subject: "WW-901 adding file2.php",
});

const fb2 = master.branch({
    name: "WC-902-modificar-category"
});
fb2.commit({
    subject: "WW-902 adding file1.php",
});

const fb3 = master.branch({
    name: "WM-903-modificar-sidebar "
});
fb3.commit({
    subject: "WW-903 adding file1.php",
});
fb3.commit({
    subject: "WW-903 adding file2.php",
});
fb3.commit({
    subject: "WW-903 adding file3.php",
});

/***********************
 *  Merge branch  *
 ***********************/

// Merge fb1 into staging
staging.merge({
    branch: fb1,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-901-modificar-shipping into staging");
staging.merge({
    branch: fb2,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-901-modificar-shipping into staging");
staging.merge({
    branch: fb3,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-901-modificar-shipping into staging");

// // Merge fb1 into staging
// master.merge({
//     branch: fb1,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WW-901-modificar-shipping into staging");
// master.merge({
//     branch: fb2,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WW-901-modificar-shipping into staging");
// master.merge({
//     branch: fb3,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WW-901-modificar-shipping into staging");

// // Merge fb2 into uat
// uat.merge({
//     branch: fb2,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WC-902-modificar-category into uat");
//
// // Merge fb3 into uat
// uat.merge({
//     branch: fb3,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WM-903-modificar-sidebar into uat");

const releaseBranch190 = master.branch("WOOW-190-release-branch-2019-31-07");
releaseBranch190.merge({
    branch: fb1,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-901-modificar-shipping into release branch");
// releaseBranch190.merge({
//     branch: fb2,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch WW-902-modificar-category into release branch");
releaseBranch190.merge({
    branch: fb3,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-903-modificar-sidebar into release branch");

// Merge fb1 into staging
master.merge({
    branch: releaseBranch190,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch releaseBranch190 into master");

// Merge fb1 into staging
// uat.merge({
//     branch: master,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch releaseBranch190 into uat");

// Merge fb1 into staging
// staging.merge({
//     branch: master,
//     // fastForward: false,
//     commitOptions: {
//         // Every valid `options` for a commit
//     },
// }, "Merging branch releaseBranch190 into staging");
