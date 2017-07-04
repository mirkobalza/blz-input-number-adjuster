# BLZ Input Number Adjuster 1.0
Use the same spinners for input[number] through all browsers

The input appears through all browsers as an `<input type="number">` on Chrome.

instructions
------------
To use *blz-input-number-adjuster* you need AngularJS. 
First of all inject the module `'blz.numinad'` into your main modules's dependecies.
Then you can start to use it! in your template use the tag `<blz-numeric-input></blz-numeric-input>` instead of `<input type="number">`.
This tag accepts 13 arguments:
* `min`: *optional*. As the `min` of `<input type="number">`, sets the lower number insertable;
* `max`: *optional*. As the `max` of `<input type="number">`, sets the higher number insertable;
* `step`: *optional*. As the `step` of `<input type="number">`, sets the step when the spinners are clicked;
* `ng-model`: *optional*. As the `ng-model` of a generic `<input>`;
* `name`: *optional*. As the `name` of a generic `<input>`;
* `ng-required`: *optional*. As the `ng-required` of a generic `<input>`;
* `ngminlength`: *optional*. As the `ng-minlength` of `<input type="number">`;
* `ngmaxlength`: *optional*. As the `ng-maxlength` of `<input type="number">`;
* `ng-pattern`: *optional*. As the `ng-pattern` of `<input type="number">`;
* `ng-disabled`: *optional*. As the `ng-disabled`  of a generic `<input>`;
* `ng-change`: *optional*. As the `ng-change`  of a generic `<input>`;
* `change-parameter`: *optional*. Parameter to be passed to `ng-change`
* `blz-class`: *optional*. Classes you want to give to the input;
