# `Demo GitGraph`

Proyecto demo que usa gitgraph/js para dibujar un git graph bastante amigable

## 👉 Try it with [the online playground](https://codepen.io/nicoespeon/pen/arqPWb?editors=1010)

## Iniciar la demo

Necesitamos realizar los siguientes pasos
```bash
npm run install
npm run dev
```
Con `npm run dev` el proyecto automáticamente se abre en tu navegador por defecto, ademas de que cualquier modificación que se haga en los archivos del folder src, este se refresca automáticamente en tu browser.

Finalmente dar click en el botón view details de la opción 1

### Listo para usar

En la ruta src/js/option/option-a.js tenemos un ejemplo de como usar la librería gitgraph.

Abajo se muestra como customizar la vista de gitgraph.
```javascript
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
};
```

Iniciar el container para renderizar gitgraph
```javascript
const graphContainer = document.getElementById("gitgraph");
const gitgraph = createGitgraph(graphContainer, options);
```

Crear branch master con 3 commits
````javascript
const master = gitgraph.branch("master");
master.commit("Init the project");
master.commit("Add Magento Commerce");
master.commit("first deploy to production");
````

Crear branch staging(2 commits) y UAT
```javascript
const staging = master.branch("staging");
staging.commit("others commit 1");
staging.commit("others commit 2");

const uat = master.branch("UAT");
```

Crear los feature branch a partir de master
```javascript
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
```

Hacer un merge de los feature branch a staging

```javascript
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
```

Crear un merge a UAT
```javascript
// Merge fb2 into uat
uat.merge({
    branch: fb2,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WC-902-modificar-category into uat");

// Merge fb3 into uat
uat.merge({
    branch: fb3,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WM-903-modificar-sidebar into uat");
```

Crear un release branch a master
```javascript
const releaseBranch190 = master.branch("WOOW-190-release-branch-2019-31-07");
releaseBranch190.merge({
    branch: fb1,
    // fastForward: false,
    commitOptions: {
        // Every valid `options` for a commit
    },
}, "Merging branch WW-901-modificar-shipping into release branch");
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
```



