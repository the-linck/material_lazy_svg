# Material Lazy SVG

React component created to Lazy Load .SVG icons from [Material Design Icons](https://github.com/marella/material-design-icons/tree/main/svg#readme) in [Material UI](https://github.com/mui/material-ui) as inline SVG elements, without a ton of dependencies for your project.



## Dependencies

* ReactJS  
    Back-bone of the project  
    ~~Maybe shouldn't even be on this list~~
* **Material UI**  
    For the SvgIcon component
* **@material-design-icons/svg**  
    The very icons we need to load



## Usage

The simplest use case requires only calling the component passing with the wanted icon name in **data-icon** prop:

```JSX
import MaterialIcon from './material_lazy_svg/MaterialIcon';

// ...

<MaterialIcon data-icon='wb_cloudy'/>;

```

Only when the parent component is rendered the icon starts to load. Nothing is shown until it's loaded, avoid the font-icon problem of showing characters while the icons didn't load.   

> When the icon is rendered, it will be shown with an inline SVG element.

Using the [Dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) is intentional, to make easier identifying parameters from the icons on the markup when needed. Also makes the code simpler.



## Styles

Another option to be passed to *MaterialIcon* component is the style to be used, as **data-style** prop.


```JSX
import MaterialIcon from './material_lazy_svg/MaterialIcon';

// ...

<MaterialIcon data-icon='book'/>; // Default (filled)
<MaterialIcon data-icon='book' data-style='filled'/>;
<MaterialIcon data-icon='book' data-style='outlined'/>;
<MaterialIcon data-icon='book' data-style='round'/>;
<MaterialIcon data-icon='book' data-style='sharp'/>;
<MaterialIcon data-icon='book' data-style='two-tone'/>;

```

Any of the 5 styles supported by Material Design Icons (filled, outlined, round, sharp, two-tone) is a valid value.
When no style is passed, filled is used by default.



## How it works
When a *MaterialIcon* is rendered for the first time, nothing will be initially rendered, the component will just try to find the chosen icon on sessionStorage to avoid making a Request.
If the icon is found, the component re-renders with the chosen icon.  
Else, it loads the icon via an HTTP fetch request, loading the .svg file as a string - that is stored on sessionStorage before showing the icon.
> If the request fails for any reason, nothing is shown.

By using sessionStorage the component avoid unnecessary requests without having to deal with any fancy cache logic.