# x-block

x-block element is a lightweight layouting system for HTML. It allows to create a layout with a single markup: `<x-block>`.

## Usage
Add `x-block.js` to your page and use `<x-block>` element to create a layout.

## Attributes

### `direction`
Indicates how the child will stack.

- `horizontal`: stack horizontally children from left to right. It's the default value.
- `vertical`: stack vertically children from top to bottom.

### `size`
One or two strings separated by a comma indicating the size of the element. The first number is the width, the second number is the height. If the second number is omitted, it will be set to `fill`.

- `fill`: fills the element to the size of the container. It's the default value.
- `auto`: sizes to the content of the element.
- Specific size: size to the specified CSS size value. 

### `dock`
One or two strings separated by a comma indicating the position of the element. The first number is the X postion, the second number is the Y position. If the second number is omitted, it will be set to `center`.

- `center`: aligns the element to the center of the container. It's the default value.
- `left`: aligns the element to the left of the container.
- `right`: aligns the element to the right of the container.
- `bottom`: aligns the element to the bottom of the container.
- `top`: aligns the element to the top of the container.

### `scrollableY`
Indicates whether the element is scrollable vertically.

### `debug`
Indicates whether the element is in debug mode. In debug mode, the element will show a border and a background color.

## Example

````
<html>
<head>
    <script src="x-block.js"></script>
</head>
<body>
    <x-block direction="vertical">
        <x-block size="fill,200px">
            Header
        </x-block>
        <x-block>
            <x-block>
                Content 1
            </x-block>
            <x-block>
                Content 2
            </x-block>
        </x-block>
        <x-block size="fill,200px">
            Footer
        </x-block>
    </x-block>
</body>
</html>
````

There is a simple example with the [index.html](index.html) file.