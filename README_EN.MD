# Description
This is a small template for writing react applications in typescript.
The template includes:
+ Configured eslint
+ Connected fonts and presets for sass
+ Basic layout structure and several pre-designed pages
+ Libraries for creating queries and storing data, for creating sliders, for routing and for creating animations
+ Creating the file structure from the console, action steps:
 1. Install plop locally/globally: 
 npm install --save-dev plop / npm install -global plop
 2. Enter the command npm run plop if installed locally or plop if installed globally
 3. Select which component you want to create
 4. Enter the name of the component

# Plans
1. Change architecture to FSD

## Code styling 

## JavaScript
All javascript files must end in *.js*.

### Components
We no longer **use** class** components in code. We **write** everything with **functional** components.

```
const Component = (props) => {
    const { width } = useGetDimensions()
    const [help, setHelp] = useState(false)
    ...
}
```

### Functions
We use *arrow* functions in the code. **Do not declare** them using the `function` keyword, only using `const`. Put accepted values in brackets **always**
```
const function = (props) => {
    ...
}


## SASS
In the project we use only *SASS* no *CSS* or *SCSS*

### Rules for writing *SASS*
A modified BEM methodology and modular SASS are used. BEM rules are similar to the usual ones, but thanks to modular SASS you can write just a class for a component instead of writing the names of all parent blocks, modular SASS will substitute the class of the main parent block automatically and create a field of visibility only for a specific component `_`. Modifiers for classes are written through the sign If you still need to write a name from the parent to some child block, then write the name through the sign `__`.
Example SASS:
```sass
.card
    width: 100%
// Child block
.card__name
        width: 50px
        height: 100p
// Modificator example
.card_active
        width...
```
JS:
```javascript
import s from './main.module.sass'

const Card = ({active}) => {
  return (
    <div 
      className={
        active 
        ? `${s.card} ${s.card_active}`
        : s.card
      }
    >
      <div className={s.card__name}>Name</div>
      content
    </div>
  )
}
```

### @use

In SASS all colors are in the `variables.sass` file, we use colors *exclusively* from there. If a color you need is not there for some reason, we contact and add it. The functions are located there as well.   
Import example:
```sass
@use "src/varibles/varibles" as *
```

### Adaptive

For *adaptive page* we use the `calcSize` function, it is described in the functions file.
**Media queries are written at the end of the *SASS* file**


## Create folders and subfolders
To avoid various bugs, the names of folders and subfolders are written exclusively via **camelCase**. Example:
`SomedayAllTheseRulesOfTheCodeWillReallyHelpUsButForNowThereIsThatIs`.

# Startup
The project starts identically to any project created with Create React App

# Troubleshooting
item in development
# Release Notes
development item
# Contributing
development item
# Code of Conduct
item in progress
# RELEASE_NOTES
item in progress
# CONTRIBUTING
item in progress
# CODE_OF_CONDUCT
item in development
# Pull Request template
development item