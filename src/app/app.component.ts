import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TaskService } from "./service";
import { CamundaXMLParser } from "./xmlparser/xmlparser";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: true }) form: DynamicFormComponent;

  type_to_config = {
    String: {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    email: {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    password: {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: []
    },
    radiobutton: {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    Date: {
      type: "date",
      label: "DOB",
      name: "dob",
      validations: []
    },
    Enum: {
      type: "select",
      label: "Country",
      name: "country",
      value: "UK",
      options: ["India", "UAE", "UK", "US"]
    },
    Boolean: {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    button: {
      type: "button",
      label: "Save"
    }
  };
  regConfig: FieldConfig[] = [];
  constructor(protected service: TaskService) {}
  ngOnInit(): void {
    this.getFormFields({
      processDefinitionId: "process",
      taskDefinitionKey: "UserSignUpTask"
    }).subscribe((res) => {
      let temp = [];
      console.log(res);
      res.formFields.forEach((element) => {
        let config = this.type_to_config[element.type];
        let validations = element.validation.map((v) => ({
          name: "",
          validator: v,
          message: ""
        }));
        config.validations && config.validations.concat(validations);
        temp.push({
          ...config,
          value: element.value || config.value,
          options: element.options || config.options
        });
      });
      this.regConfig = temp;
      console.log(temp);
    });
  }

  private getFormFields(task): Observable<any> {
    return this.service.getProcessDefinitionXML(task.processDefinitionId).pipe(
      map((xml) => {
        const parser = new CamundaXMLParser(xml.bpmn20Xml);
        return {
          ...task,
          formFields:[
            {
              "text": "# Textqqqq",
              "label": "Text view",
              "type": "text",
              "layout": {
                "row": "Row_1lcmbx2",
                "columns": null
              },
              "id": "Field_0nw919m",
              "conditional": {
                "hide": true
              },
              "properties": {}
            },
            {
              "text": "fsfsfsf",
              "label": "Text view",
              "type": "text",
              "layout": {
                "row": "Row_0rvxb3v",
                "columns": null
              },
              "id": "Field_0916fvf"
            },
            {
              "label": "Number",
              "type": "number",
              "layout": {
                "row": "Row_19ntwt0",
                "columns": null
              },
              "id": "Field_14c417p",
              "key": "numberr",
              "validate": {
                "required": true,
                "min": 10,
                "max": 100
              },
              "disabled": true,
              "readonly": true,
              "increment": "10",
              "decimalDigits": 3,
              "defaultValue": 10,
              "description": "hjhjj"
            },
            {
              "subtype": "date",
              "dateLabel": "Date",
              "label": "Date time",
              "type": "datetime",
              "layout": {
                "row": "Row_1f4zsq9",
                "columns": null
              },
              "id": "Field_186g09o",
              "key": "field_0wqcp4l",
              "validate": {
                "required": true
              },
              "disallowPassedDates": true
            },
            {
              "subtype": "datetime",
              "dateLabel": "Date",
              "label": "Date time",
              "type": "datetime",
              "layout": {
                "row": "Row_13x4vu6",
                "columns": null
              },
              "id": "Field_0dtec3y",
              "key": "field_1yo68ac",
              "timeLabel": "Time",
              "timeSerializingFormat": "utc_offset",
              "timeInterval": 15,
              "disallowPassedDates": true
            },
            {
              "subtype": "time",
              "label": "Date time",
              "type": "datetime",
              "layout": {
                "row": "Row_13x4vu6",
                "columns": null
              },
              "id": "Field_0ob25q6",
              "key": "field_18elmsv",
              "timeLabel": "Time",
              "timeSerializingFormat": "utc_offset",
              "timeInterval": 15
            },
            {
              "label": "Text field",
              "type": "textfield",
              "layout": {
                "row": "Row_13x4vu6",
                "columns": null
              },
              "id": "Field_14ybp8x",
              "key": "field_06bo6wz"
            },
            {
              "label": "Text area",
              "type": "textarea",
              "layout": {
                "row": "Row_0l598vf",
                "columns": null
              },
              "id": "Field_1iqsps7",
              "key": "field_1xgz98n",
              "validate": {
                "minLength": 10,
                "maxLength": 100
              }
            },
            {
              "label": "Image view",
              "type": "image",
              "layout": {
                "row": "Row_0og5cdl",
                "columns": null
              },
              "id": "Field_0h0x4uw",
              "source": "https://dummyimage.com/600x400/000/fff"
            },
            {
              "label": "Checkbox",
              "type": "checkbox",
              "layout": {
                "row": "Row_1622g3x",
                "columns": null
              },
              "id": "Field_1749mor",
              "key": "field_0s50qbd",
              "defaultValue": true,
              "validate": {
                "required": false
              },
              "properties": {},
              "description": "Checkbox"
            },
            {
              "values": [
                {
                  "label": "Value",
                  "value": "value"
                }
              ],
              "label": "Checklist",
              "type": "checklist",
              "layout": {
                "row": "Row_01104zf",
                "columns": null
              },
              "id": "Field_05hl5b7",
              "key": "field_0roooyr"
            },
            {
              "label": "Checklist",
              "type": "checklist",
              "layout": {
                "row": "Row_01104zf",
                "columns": null
              },
              "id": "Field_0hpp387",
              "key": "field_19jstj3",
              "valuesKey": ""
            },
            {
              "values": [
                {
                  "label": "Value",
                  "value": "value"
                },
                {
                  "label": "Value 2",
                  "value": "value2"
                }
              ],
              "label": "Radio",
              "type": "radio",
              "layout": {
                "row": "Row_13yoh1m",
                "columns": null
              },
              "id": "Field_03z4qa9",
              "key": "field_1co21ou"
            },
            {
              "values": [
                {
                  "label": "Value",
                  "value": "value"
                },
                {
                  "label": "Value 2",
                  "value": "value2"
                },
                {
                  "label": "Value 3",
                  "value": "value3"
                }
              ],
              "label": "Tag list",
              "type": "taglist",
              "layout": {
                "row": "Row_13yoh1m",
                "columns": null
              },
              "id": "Field_131wd10",
              "key": "field_03w3coe"
            },
            {
              "action": "submit",
              "label": "Button",
              "type": "button",
              "layout": {
                "row": "Row_0eylosk",
                "columns": null
              },
              "id": "Field_0itjphj",
              "key": "field_06evqo7"
            },
            {
              "values": [
                {
                  "label": "Value",
                  "value": "value"
                },
                {
                  "label": "Value 2",
                  "value": "value2"
                },
                {
                  "label": "Value 3",
                  "value": "value3"
                }
              ],
              "label": "Select",
              "type": "select",
              "layout": {
                "row": "Row_1motmsf",
                "columns": null
              },
              "id": "Field_1ov5uu3",
              "key": "field_1mdg7r6"
            },
            {
              "label": "Tag list",
              "type": "taglist",
              "layout": {
                "row": "Row_1motmsf",
                "columns": null
              },
              "id": "Field_0g8cjgs",
              "key": "field_0m5ctoh",
              "valuesKey": ""
            },
            {
              "text": "# Text",
              "label": "Text view",
              "type": "text",
              "layout": {
                "row": "Row_1motmsf",
                "columns": null
              },
              "id": "Field_0quh30w"
            }
          ]
        };
      })
    );
  }
  submit(value: any) {}
}
