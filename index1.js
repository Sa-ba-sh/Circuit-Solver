// //Popup
// $(window).load(function () {
//   $(".trigger_popup_fricc").click(function () {
//     $(".hover_bkgr_fricc").show();
//   });
//   $(".hover_bkgr_fricc").click(function () {
//     $(".hover_bkgr_fricc").hide();
//   });
//   $(".popupCloseButton").click(function () {
//     $(".hover_bkgr_fricc").hide();
//   });
// });
// Dictionary to store the count of individual elements
var field_values_final = [];

async function inputReset() {
  console.log("Comes");

  cond_matrix = [];
  console.log("Proceed");
}
var cond_matrix = [];

ele_count = {
  resistor: 0,
  curr_src: 0,
  volt_src: 0,
  vccs: 0,
  vcvs: 0,
  cccs_gen: 0,
  cccs_vs: 0,
  ccvs_gen: 0,
  ccvs_vs: 0,
};

resistor_list = [];
curr_src_list = [];
volt_src_list = [];
vccs_list = [];
vcvs_list = [];
cccs_gen_list = [];
cccs_vs_list = [];
ccvs_gen_list = [];
ccvs_vs_list = [];

var input_fields = [];
var ele_code = [];

var ele_code_value = {
  1: "Resistor",
  2: "Current Source",
  3: "Voltage Source",
  4: "Voltage Controlled Current Source",
  5: "Voltage Controlled Voltage Source",
  6: "Current Controlled Current Source(General)",
  7: "Current Controlled Current Source(Vs)",
  8: "Current Controlled Voltage Source(General)",
  9: "Current Controlled Voltage Source(Vs)",
};
var img_dir = {
  1: "./images/Resistor.png",
  2: "./images/IS.png",
  3: "./images/Vs.png",
  4: "./images/VCCS.png",
  5: "./images/VCVS.png",
  6: "./images/CCCS_gen.png",
  7: "./images/CCCS_Vs.png",
  8: "./images/CCVS.png",
  9: "./images/CCVS_Vs.png",
};
class resistor {
  constructor(ele_code, resistor_value, node_high, node_low) {
    this.ele_code = ele_code;
    this.resistor_value = resistor_value;
    this.node_high = node_high;
    this.node_low = node_low;
  }
}

class curr_src {
  constructor(ele_code, current, node_high, node_low) {
    this.ele_code = ele_code;
    this.current = current;
    this.node_high = node_high;
    this.node_low = node_low;
  }
}

class volt_src {
  constructor(ele_code, voltage, node_high, node_low) {
    this.ele_code = ele_code;
    this.voltage = voltage;
    this.node_high = node_high;
    this.node_low = node_low;
  }
}
class vccs {
  constructor(
    ele_code,
    trans_conductance,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.trans_conductance = trans_conductance;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}
class vcvs {
  constructor(
    ele_code,
    control_factor,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.control_factor = control_factor;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}
class cccs_gen {
  constructor(
    ele_code,
    control_factor,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.control_factor = control_factor;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}
class cccs_vs {
  constructor(
    ele_code,
    control_factor,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.control_factor = control_factor;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}
class ccvs_gen {
  constructor(
    ele_code,
    trans_resistance,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.trans_resistance = trans_resistance;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}
class ccvs_vs {
  constructor(
    ele_code,
    trans_resistance,
    node_high,
    node_low,
    control_vol_node_high,
    control_vol_node_low
  ) {
    this.ele_code = ele_code;
    this.trans_resistance = trans_resistance;
    this.node_high = node_high;
    this.node_low = node_low;
    this.control_vol_node_high = control_vol_node_high;
    this.control_vol_node_low = control_vol_node_low;
  }
}

function get_input_fields(ele_code) {
  if (ele_code == 1) {
    ele_count["resistor"] = ele_count["resistor"] + 1;

    var fields_to_ask = [
      "Enter the resistance value (in ohms):",
      "Enter one terminal node value of the resistance: ",
      "Enter other terminal node value of the resistance: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 2) {
    ele_count["curr_src"] = ele_count["curr_src"] + 1;

    var fields_to_ask = [
      "Enter the current value (in amperes): ",
      "Enter the high potential(k) node to which the current source is connected:",
      "Enter the low potential node(l) to which the current source is connected: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 3) {
    ele_count["volt_src"] = ele_count["volt_src"] + 1;

    var fields_to_ask = [
      "Enter the voltage value (in volts):",
      "Enter the high potential node(k) to which the voltage source is connected:",
      "Enter the low potential node(l) to which the voltage source is connected: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 4) {
    ele_count["vccs"] = ele_count["vccs"] + 1;

    var fields_to_ask = [
      "Enter the trans-conductance value (Gm in siemens): ",
      "Enter the high potential node(k) to which the controlled current source is connected: ",
      "Enter the low potential node(l) to which the controlled current source is connected: ",
      "Enter the high potential node(m) to which the controlling voltage is connected: ",
      "Enter the low potential node(n) to which the controlling voltage is connected: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 5) {
    ele_count["vcvs"] = ele_count["vcvs"] + 1;

    var fields_to_ask = [
      "Enter the control-factor value(Av): ",
      "Enter the high potential node(k) to which the controlled voltage source is connected: ",
      "Enter the low potential node(l) to which the controlled voltage source is connected: ",
      "Enter the high potential node(m) to which the controlling voltage is connected: ",
      "Enter the low potential node(n) to which the controlling voltage is connected: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 6) {
    ele_count["cccs_gen"] = ele_count["cccs_gen"] + 1;

    var fields_to_ask = [
      "Enter the control-factor value(Al): ",
      "Enter the high potential node(k) to which the controlled current source is connected: ",
      "Enter the low potential node(l) to which the controlled current source is connected: ",
      "Enter the high potential node(m) from which the controlling current flows: ",
      "Enter the low potential node(n) from which the controlling current flows: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 7) {
    ele_count["cccs_vs"] = ele_count["cccs_vs"] + 1;

    var fields_to_ask = [
      "Enter the control-factor value:(Al) ",
      "Enter the high potential node(k) to which the controlled current source is connected: ",
      "Enter the low potential node(l) to which the controlled current source is connected: ",
      "Enter the high potential node(m) from which the controlling current flows:",
      "Enter the low potential node(n) from which the controlling current flows: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 8) {
    ele_count["ccvs_gen"] = ele_count["ccvs_gen"] + 1;

    var fields_to_ask = [
      "Enter the trans-resistance value (Rm in ohms): ",
      "Enter the high potential node(k) to which the controlled voltage source is connected: ",
      "Enter the low potential node(l) to which the controlled voltage source is connected: ",
      "Enter the high potential node(m) from which the controlling current flows: ",
      "Enter the low potential node(n) from which the controlling current flows: ",
    ];
    return fields_to_ask;
  }
  if (ele_code == 9) {
    ele_count["ccvs_vs"] = ele_count["ccvs_vs"] + 1;

    var fields_to_ask = [
      "Enter the trans-resistance value(Rm): ",
      "Enter the high potential node(k) to which the controlled voltage source is connected: ",
      "Enter the low potential node(l) to which the controlled voltage source is connected: ",
      "Enter the high potential node(m) from which the controlling current flows: ",
      "Enter the low potential node(n) from which the controlling current flows: ",
    ];
    return fields_to_ask;
  }
}

function showdialog() {
  var elements = parseFloat(document.getElementById("elements").value);
  var nodes = parseFloat(document.getElementById("nodes").value);
  if (
    Number.isInteger(elements) &&
    Number.isInteger(nodes) &&
    elements > 0 &&
    nodes > 0
  ) {
    if (
      document.getElementById("ele-code") &&
      document.getElementById("final-inputs")
    ) {
      document.getElementById("ele-code").remove();
      document.getElementById("final-inputs").remove();
      var form = document.createElement("form");
      form.setAttribute("id", "ele-code");
      form.setAttribute("class", "animate__animated animate__backInUp");

      for (i = 0; i < elements; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "input-group row ");

        var span = document.createElement("span");
        span.setAttribute(
          "class",
          "input-group-text input-group-prepend col-md-5"
        );
        span.setAttribute("id", "basic-addon1");
        span.innerHTML = "Element of kind " + (i + 1);
        div.appendChild(span);

        var dropdown = document.createElement("div");
        dropdown.setAttribute("class", "btn-group dropdown col-md-7");
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute(
          "class",
          "btn btn-secondary btn-lg dropdown-toggle"
        );

        var menu = document.createElement("select");
        menu.setAttribute("class", "");
        menu.setAttribute("id", "ele_code" + (i + 1));
        menu.required = true;
        var selected = document.createElement("option");
        selected.innerHTML = "";
        menu.appendChild(selected);
        var option1 = document.createElement("option");
        option1.innerHTML = "Resistor";
        menu.appendChild(option1);
        var option2 = document.createElement("option");
        option2.innerHTML = "Current Source";
        menu.appendChild(option2);
        var option3 = document.createElement("option");
        option3.innerHTML = "Voltage Source";
        menu.appendChild(option3);
        var option4 = document.createElement("option");
        option4.innerHTML = "Voltage Controlled Current Source";
        menu.appendChild(option4);
        var option5 = document.createElement("option");
        option5.innerHTML = "Voltage Controlled Voltage Source";
        menu.appendChild(option5);
        var option6 = document.createElement("option");
        option6.innerHTML = "Current Controlled Current Source(General)";
        menu.appendChild(option6);
        var option7 = document.createElement("option");
        option7.innerHTML = "Current Controlled Current Source(Vs)";
        menu.appendChild(option7);
        var option8 = document.createElement("option");
        option8.innerHTML = "Current Controlled Voltage Source(General)";
        menu.appendChild(option8);
        var option9 = document.createElement("option");
        option9.innerHTML = "Current Controlled Voltage Source(Vs)";
        menu.appendChild(option9);
        dropdown.appendChild(menu);
        div.appendChild(dropdown);
        form.appendChild(div);
      }
      var div_btn = document.createElement("div");
      div_btn.setAttribute("class", "col-md-12 text-center");
      var s = document.createElement("button");
      s.innerHTML = "Submit";
      s.setAttribute("onclick", "getInputs()");
      s.setAttribute("type", "button");
      s.setAttribute("class", "btn btn-green submit");
      div_btn.appendChild(s);
      form.appendChild(div_btn);

      document.body.appendChild(form);
    } else if (document.getElementById("ele-code")) {
      document.getElementById("ele-code").remove();

      var form = document.createElement("form");
      form.setAttribute("id", "ele-code");
      form.setAttribute("class", "animate__animated animate__backInUp");

      for (i = 0; i < elements; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "input-group row ");

        var span = document.createElement("span");
        span.setAttribute(
          "class",
          "input-group-text input-group-prepend col-md-5"
        );
        span.setAttribute("id", "basic-addon1");
        span.innerHTML = "Element kind of " + (i + 1);
        div.appendChild(span);

        var dropdown = document.createElement("div");
        dropdown.setAttribute("class", "btn-group dropdown col-md-7");
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute(
          "class",
          "btn btn-secondary btn-lg dropdown-toggle"
        );

        var menu = document.createElement("select");
        menu.setAttribute("class", "");
        menu.setAttribute("id", "ele_code" + (i + 1));
        menu.required = true;
        var selected = document.createElement("option");
        selected.innerHTML = "";
        menu.appendChild(selected);
        var option1 = document.createElement("option");
        option1.innerHTML = "Resistor";
        menu.appendChild(option1);
        var option2 = document.createElement("option");
        option2.innerHTML = "Current Source";
        menu.appendChild(option2);
        var option3 = document.createElement("option");
        option3.innerHTML = "Voltage Source";
        menu.appendChild(option3);
        var option4 = document.createElement("option");
        option4.innerHTML = "Voltage Controlled Current Source";
        menu.appendChild(option4);
        var option5 = document.createElement("option");
        option5.innerHTML = "Voltage Controlled Voltage Source";
        menu.appendChild(option5);
        var option6 = document.createElement("option");
        option6.innerHTML = "Current Controlled Current Source(General)";
        menu.appendChild(option6);
        var option7 = document.createElement("option");
        option7.innerHTML = "Current Controlled Current Source(Vs)";
        menu.appendChild(option7);
        var option8 = document.createElement("option");
        option8.innerHTML = "Current Controlled Voltage Source(General)";
        menu.appendChild(option8);
        var option9 = document.createElement("option");
        option9.innerHTML = "Current Controlled Voltage Source(Vs)";
        menu.appendChild(option9);
        dropdown.appendChild(menu);
        div.appendChild(dropdown);
        form.appendChild(div);
      }
      var div_btn = document.createElement("div");
      div_btn.setAttribute("class", "col-md-12 text-center");
      var s = document.createElement("button");
      s.innerHTML = "Submit";
      s.setAttribute("onclick", "getInputs()");
      s.setAttribute("type", "button");
      s.setAttribute("class", "btn btn-green submit");
      div_btn.appendChild(s);
      form.appendChild(div_btn);

      document.body.appendChild(form);
    } else {
      var form = document.createElement("form");
      form.setAttribute("id", "ele-code");
      form.setAttribute("class", "animate__animated animate__backInUp");

      for (i = 0; i < elements; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "input-group row ");

        var span = document.createElement("span");
        span.setAttribute(
          "class",
          "input-group-text input-group-prepend col-md-5"
        );
        span.setAttribute("id", "basic-addon1");
        span.innerHTML = "Element kind of " + (i + 1);
        div.appendChild(span);

        var dropdown = document.createElement("div");
        dropdown.setAttribute("class", "btn-group dropdown col-md-7");
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute(
          "class",
          "btn btn-secondary btn-lg dropdown-toggle"
        );

        var menu = document.createElement("select");
        menu.setAttribute("class", "");
        menu.setAttribute("id", "ele_code" + (i + 1));
        menu.required = true;
        var selected = document.createElement("option");
        selected.innerHTML = "";
        menu.appendChild(selected);
        var option1 = document.createElement("option");
        option1.innerHTML = "Resistor";
        menu.appendChild(option1);
        var option2 = document.createElement("option");
        option2.innerHTML = "Current Source";
        menu.appendChild(option2);
        var option3 = document.createElement("option");
        option3.innerHTML = "Voltage Source";
        menu.appendChild(option3);
        var option4 = document.createElement("option");
        option4.innerHTML = "Voltage Controlled Current Source";
        menu.appendChild(option4);
        var option5 = document.createElement("option");
        option5.innerHTML = "Voltage Controlled Voltage Source";
        menu.appendChild(option5);
        var option6 = document.createElement("option");
        option6.innerHTML = "Current Controlled Current Source(General)";
        menu.appendChild(option6);
        var option7 = document.createElement("option");
        option7.innerHTML = "Current Controlled Current Source(Vs)";
        menu.appendChild(option7);
        var option8 = document.createElement("option");
        option8.innerHTML = "Current Controlled Voltage Source(General)";
        menu.appendChild(option8);
        var option9 = document.createElement("option");
        option9.innerHTML = "Current Controlled Voltage Source(Vs)";
        menu.appendChild(option9);
        dropdown.appendChild(menu);
        div.appendChild(dropdown);
        form.appendChild(div);
      }
      var div_btn = document.createElement("div");
      div_btn.setAttribute("class", "col-md-12 text-center");
      var s = document.createElement("button");
      s.innerHTML = "Submit";
      s.setAttribute("onclick", "getInputs()");
      s.setAttribute("type", "button");
      s.setAttribute("class", "btn btn-green submit");
      div_btn.appendChild(s);
      form.appendChild(div_btn);

      document.body.appendChild(form);
    }
  } else {
    alert(
      "Please enter valid inputs!! \nInstructions: \n1.No fields must be empty \n2.Inputs must be positive integers"
    );
  }
}

function getInputs() {
  ele_code = [];
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  var elements = parseInt(document.getElementById("elements").value);
  for (var i = 0; i < parseInt(elements); i++) {
    var code = getKeyByValue(
      ele_code_value,
      document.getElementById("ele_code" + (i + 1)).value
    );
    ele_code.push(code);
  }

  function checkcode(code) {
    return code >= 1 && code <= 9;
  }
  if (!ele_code.some(isNaN) && ele_code.every(checkcode)) {
    if (document.getElementById("final-inputs")) {
      input_fields = [];
      document.getElementById("final-inputs").remove();
      for (var i = 0; i < ele_code.length; i++) {
        var input_field = get_input_fields(ele_code[i]);
        input_fields.push(input_field);
      }

      var form = document.createElement("form");
      form.setAttribute(
        "class",
        "container values animate__animated animate__fadeInUp"
      );
      form.setAttribute("id", "final-inputs");
      // form.setAttribute("id", "scrollto");
      form.setAttribute("autocomplete", "off");

      for (i = 0; i < input_fields.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "input");
        var heading = document.createElement("h4");
        heading.innerHTML =
          "Element" + (i + 1) + " : " + ele_code_value[ele_code[i]];
        div1.appendChild(heading);
        var div_close = document.createElement("div");
        div_close.setAttribute("class", "row");

        //   var img = document.createElement("div")
        // img.setAttribute("class", "row")
        var img_div = document.createElement("div");
        img_div.setAttribute("class", "col-md-6");
        var img_src = document.createElement("img");
        img_src.setAttribute("src", img_dir[ele_code[i]]);
        img_src.setAttribute("class", "image");

        img_div.appendChild(img_src);
        // img.appendChild(img_div)
        div_close.appendChild(img_div);
        var input_div = document.createElement("div");
        input_div.setAttribute("class", "col-md-6 input-div");

        for (var j = 0; j < input_fields[i].length; j++) {
          var div_row = document.createElement("div");
          div_row.setAttribute("class", "row py-4");
          var div_2 = document.createElement("div");
          div_2.setAttribute("class", "col-lg-8");

          var div = document.createElement("div");
          div.setAttribute("class", "row");

          var span = document.createElement("span");
          span.setAttribute("class", "col-md-8 span-text");
          // span.setAttribute("id", "basic-addon1");
          span.innerHTML = input_fields[i][j];
          div.appendChild(span);

          var IN = document.createElement("input");
          IN.setAttribute("type", "text");
          IN.setAttribute("id", i + "&" + j);
          IN.setAttribute("class", "col-md-4 input-reset");

          div.appendChild(IN);
          div_2.appendChild(div);
          div_row.appendChild(div_2);
          // div1.appendChild(div_row);
          input_div.appendChild(div_row);
        }
        div_close.appendChild(input_div);
        div1.appendChild(div_close);
        form.appendChild(div1);
      }
      var s = document.createElement("button");
      s.innerHTML = "Submit";
      s.setAttribute("onclick", "printResults()");
      s.setAttribute("type", "button");
      s.setAttribute("class", "btn btn-green submit");
      s.setAttribute("data-toggle", "modal");
      s.setAttribute("data-target", "#output");

      form.appendChild(s);

      document.body.appendChild(form);
      var container = document.body,
        element = document.getElementById("final-inputs");
      container.scrollTop = element.offsetTop;
    } else {
      input_fields = [];

      for (var i = 0; i < ele_code.length; i++) {
        var input_field = get_input_fields(ele_code[i]);
        input_fields.push(input_field);
      }
      var form = document.createElement("form");
      form.setAttribute(
        "class",
        "container values animate__animated animate__fadeInUp"
      );
      form.setAttribute("id", "final-inputs");
      // form.setAttribute("id", "scrollto");
      form.setAttribute("autocomplete", "off");

      // for (i = 0; i < input_fields.length; i++) {
      //   var div1 = document.createElement("div");
      //   div1.setAttribute("class", "input");
      //   var heading = document.createElement("h4");
      //   heading.innerHTML =
      //     "Element" + (i + 1) + " :" + ele_code_value[ele_code[i]];
      //   div1.appendChild(heading);

      //   for (var j = 0; j < input_fields[i].length; j++) {
      //     var div_row = document.createElement("div");
      //     div_row.setAttribute("class", "row py-4");
      //     var div_2 = document.createElement("div");
      //     div_2.setAttribute("class", "col-lg-8");

      //     var div = document.createElement("div");
      //     div.setAttribute("class", "row");

      //     var span = document.createElement("span");
      //     span.setAttribute("class", "col-md-8 span-text");
      //     // span.setAttribute("id", "basic-addon1");
      //     span.innerHTML = input_fields[i][j];
      //     div.appendChild(span);

      //     var IN = document.createElement("input");
      //     IN.setAttribute("type", "text");
      //     IN.setAttribute("id", i + "&" + j);
      //     IN.setAttribute("class", "col-md-4");

      //     div.appendChild(IN);
      //     div_2.appendChild(div);
      //     div_row.appendChild(div_2);
      //     div1.appendChild(div_row);
      //   }
      //   form.appendChild(div1);
      // }
      for (i = 0; i < input_fields.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "input");
        var heading = document.createElement("h4");
        heading.innerHTML =
          "Element" + (i + 1) + " : " + ele_code_value[ele_code[i]];
        div1.appendChild(heading);
        var div_close = document.createElement("div");
        div_close.setAttribute("class", "row");

        //   var img = document.createElement("div")
        // img.setAttribute("class", "row")
        var img_div = document.createElement("div");
        img_div.setAttribute("class", "col-md-6");
        var img_src = document.createElement("img");
        img_src.setAttribute("class", "image");

        img_src.setAttribute("src", img_dir[ele_code[i]]);
        img_div.appendChild(img_src);
        // img.appendChild(img_div)
        div_close.appendChild(img_div);
        var input_div = document.createElement("div");
        input_div.setAttribute("class", "col-md-6 input-div");

        for (var j = 0; j < input_fields[i].length; j++) {
          var div_row = document.createElement("div");
          div_row.setAttribute("class", "row py-4");
          var div_2 = document.createElement("div");
          div_2.setAttribute("class", "col-lg-8");

          var div = document.createElement("div");
          div.setAttribute("class", "row");

          var span = document.createElement("span");
          span.setAttribute("class", "col-md-8 span-text");
          // span.setAttribute("id", "basic-addon1");
          span.innerHTML = input_fields[i][j];
          div.appendChild(span);

          var IN = document.createElement("input");
          IN.setAttribute("type", "text");
          IN.setAttribute("id", i + "&" + j);
          IN.setAttribute("class", "col-md-4 input-reset");

          div.appendChild(IN);
          div_2.appendChild(div);
          div_row.appendChild(div_2);
          // div1.appendChild(div_row);
          input_div.appendChild(div_row);
        }
        div_close.appendChild(input_div);
        div1.appendChild(div_close);
        form.appendChild(div1);
      }

      var s = document.createElement("button");
      s.innerHTML = "Submit";
      s.setAttribute("onclick", "printResults()");
      s.setAttribute("type", "button");
      s.setAttribute("class", "btn btn-green submit");
      s.setAttribute("data-toggle", "modal");
      s.setAttribute("data-target", "#output");

      form.appendChild(s);

      document.body.appendChild(form);
      var container = document.body,
        element = document.getElementById("final-inputs");
      container.scrollTop = element.offsetTop;
    }
  } else {
    // var error = document.createElement("h4");
    // error.innerHTML = "Please enter valid inputs";
    // error.setAttribute("id", "error1");
    // document.body.appendChild(error);
    alert("Please enter valid inputs");
  }
}
function printResults() {
  var elements = parseInt(document.getElementById("elements").value);

  //Static method of creating the matrix and fixing the size
  var nodes = parseInt(document.getElementById("nodes").value);

  var size = parseInt(nodes) + ele_count["volt_src"] + ele_count["vcvs"];
  console.log("cond_matrix1: ", JSON.stringify(cond_matrix));
  cond_matrix = Array(size)
    .fill()
    .map(() => Array(size).fill(0));
  console.log("cond_matrix2: ", JSON.stringify(cond_matrix));

  var curr_matrix = Array(size)
    .fill()
    .map(() => Array(1).fill(0));

  var var_matrix = Array(size)
    .fill()
    .map(() => Array(1).fill(0));

  var var_list = [];
  for (let i = 0; i < nodes; i++) {
    var_list.push("V_" + String(i + 1));
  }

  // Variable for selecting apt the column of conductance and current matrix
  var obj_volt_src_cnt = 0;
  var obj_vccs_cnt = 0; // Variable for selecting the apt column if the element is a vccs
  var obj_vcvs_cnt = 0;
  var obj_cccs_gen_cnt = 0;
  var obj_cccs_vs_cnt = 0;
  var obj_ccvs_gen_cnt = 0;
  var obj_ccvs_vs_cnt = 0;
  for (i = 0; i < input_fields.length; i++) {
    var field_values = [];

    for (var j = 0; j < input_fields[i].length; j++) {
      var field_value = parseFloat(document.getElementById(i + "&" + j).value);
      field_values.push(field_value);
    }
    field_values_final.push(field_values);
  }
  for (var k = 0; k < elements; k++) {
    if (ele_code[k] == 1) {
      var code = 1;
      var r_val = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      const res = new resistor(code, r_val, n_h, n_l);
      resistor_list.push(res);
    } else if (ele_code[k] == 2) {
      var code = 2;
      var i_val = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var curr = new curr_src(code, i_val, n_h, n_l);
      curr_src_list.push(curr);
    } else if (ele_code[k] == 3) {
      var code = 3;
      var v_val = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var volt = new volt_src(code, v_val, n_h, n_l);
      volt_src_list.push(volt);
    } else if (ele_code[k] == 4) {
      var code = 4;
      var tr_con = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var vccsList = new vccs(code, tr_con, n_h, n_l, cont_n_h, cont_n_l);
      vccs_list.push(vccsList);
    } else if (ele_code[k] == 5) {
      var code = 5;
      var cont_ftr = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var vcvsList = new vcvs(code, cont_ftr, n_h, n_l, cont_n_h, cont_n_l);
      vcvs_list.push(vcvsList);
    } else if (ele_code[k] == 6) {
      var code = 6;
      var con_ftr = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var cccsGen = new cccs_gen(code, con_ftr, n_h, n_l, cont_n_h, cont_n_l);
      cccs_gen_list.push(cccsGen);
    } else if (ele_code[k] == 7) {
      var code = 7;
      var con_ftr = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var cccsVs = new cccs_vs(code, con_ftr, n_h, n_l, cont_n_h, cont_n_l);
      cccs_vs_list.push(cccsVs);
    } else if (ele_code[k] == 8) {
      var code = 8;
      var tr_res = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var ccvsGen = new ccvs_gen(code, tr_res, n_h, n_l, cont_n_h, cont_n_l);
      ccvs_gen_list.push(ccvsGen);
    } else if (ele_code[k] == 9) {
      var code = 9;
      var tr_res = field_values_final[k][0];
      var n_h = field_values_final[k][1];
      var n_l = field_values_final[k][2];
      var cont_n_h = field_values_final[k][3];
      var cont_n_l = field_values_final[k][4];
      var ccvsVs = new ccvs_vs(code, tr_res, n_h, n_l, cont_n_h, cont_n_l);
      ccvs_vs_list.push(ccvsVs);
    }
  }

  for (var obj = 0; obj < curr_src_list.length; obj++) {
    // Contributes only to cuurent matrix
    var n_k = parseInt(curr_src_list[obj].node_high) - 1;
    var n_l = parseInt(curr_src_list[obj].node_low) - 1;
    var current = parseFloat(curr_src_list[obj].current);

    if (n_k != -1 && n_l != -1) {
      curr_matrix[n_k][0] += current;
      curr_matrix[n_l][0] -= current;
    } else if (n_k == -1 && n_l != -1) {
      curr_matrix[n_l][0] -= current;
    } else if (n_k != -1 && n_l == -1) {
      curr_matrix[n_k][0] += current;
    }
  }

  for (var obj = 0; obj < volt_src_list.length; obj++) {
    //  The following code is only when there is one voltage source in the circuit
    // Contributes to both current and conductance matrix
    var n_k = parseInt(volt_src_list[obj].node_high) - 1;
    var n_l = parseInt(volt_src_list[obj].node_low) - 1;
    var voltage = parseFloat(volt_src_list[obj].voltage);
    var count = 0;
    var new_var = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    for (var i = 0; i < var_list.length; i++) {
      if (var_list[i] == new_var) {
        count = count + 1;
      }
    }
    if (count == 0) {
      var_list.push(new_var);
    }
    var idx = var_list.indexOf(new_var);
    if (n_k != -1 && n_l != -1) {
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;

      curr_matrix[idx][0] += voltage;
      obj_volt_src_cnt += 1;
    } else if (n_k == -1 && n_l != -1) {
      cond_matrix[n_l][idx] -= 1;
      cond_matrix[idx][n_l] -= 1;

      curr_matrix[idx][0] += voltage;

      obj_volt_src_cnt += 1;
    } else if (n_l == -1 && n_k != -1) {
      cond_matrix[n_k][idx] += 1;
      cond_matrix[idx][n_k] += 1;

      curr_matrix[idx][0] += voltage;

      obj_volt_src_cnt += 1;
    }
  }
  for (var obj = 0; obj < vccs_list.length; obj++) {
    var n_k = parseInt(vccs_list[obj].node_high) - 1;
    var n_l = parseInt(vccs_list[obj].node_low) - 1;

    var ctrl_n_m = parseInt(vccs_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(vccs_list[obj].control_vol_node_low) - 1;

    var transconductance = parseFloat(vccs_list[obj].trans_conductance);
    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
    }
  }

  // VCVS contributes only to the conductance matrix
  for (var obj = 0; obj < vcvs_list.length; obj++) {
    var n_k = parseInt(vcvs_list[obj].node_high) - 1;
    var n_l = parseInt(vcvs_list[obj].node_low) - 1;

    var ctrl_n_m = parseInt(vcvs_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(vcvs_list[obj].control_vol_node_low) - 1;

    var ctrl_ftr = parseFloat(vcvs_list[obj].control_factor);
    var new_var = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    var count = 0;
    for (var i = 0; i < var_list.length; i++) {
      if (var_list[i] == new_var) {
        count = count + 1;
      }
    }
    if (count == 0) {
      var_list.push(new_var);
    }

    var idx = var_list.indexOf(new_var);

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    }
  }

  // CCCS contributes only to the conductance matrix
  for (var obj = 0; obj < cccs_gen_list.length; obj++) {
    var n_k = parseInt(cccs_gen_list[obj].node_high) - 1;
    var n_l = parseInt(cccs_gen_list[obj].node_low) - 1;
    var ctrl_n_m = parseInt(cccs_gen_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(cccs_gen_list[obj].control_vol_node_low) - 1;
    var ctrl_ftr = parseFloat(cccs_gen_list[obj].control_factor);

    var new_var_V = "V_" + String(ctrl_n_m + 1) + "_";

    var var_list1 = var_list.slice(0, ctrl_n_m + 1);
    var_list1.push(new_var_V);
    var_list2 = var_list1.concat(var_list.slice(ctrl_n_m + 1));
    var_list = var_list2;

    var cond_matrix1 = cond_matrix.slice(0, ctrl_n_m + 1);
    cond_matrix1.push(Array(size).fill(0));
    cond_matrix1 = cond_matrix1.concat(cond_matrix.slice(ctrl_n_m + 1));
    cond_matrix = cond_matrix1;

    var cond_matrix2 = cond_matrix
      .slice(0)
      .map((i) => i.slice(0, ctrl_n_m + 1));
    var cond_matrix_two = cond_matrix2;

    var cond_matrix3 = cond_matrix.slice(0).map((i) => i.slice(ctrl_n_m + 1));
    for (var j = 0; j < cond_matrix2.length; j++) {
      cond_matrix2[j][cond_matrix2[j].length] = 0;
    }

    var cond_matrix4 = [];
    for (var i = 0; i < cond_matrix2.length; i++) {
      cond_matrix4[i] = cond_matrix2[i].concat(cond_matrix3[i]);
    }
    cond_matrix = cond_matrix4;
    curr_matrix1 = curr_matrix.slice(0, ctrl_n_m + 1);
    curr_matrix1.push(Array(1).fill(0));
    curr_matrix1 = curr_matrix1.concat(curr_matrix.slice(ctrl_n_m + 1));
    curr_matrix = curr_matrix1;

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    var cond_matrix_check = cond_matrix;
    var length = cond_matrix.length;
    for (var k = 0; k < length; k++) {
      cond_matrix[k] = cond_matrix[k].concat(0);
    }
    curr_matrix.push(Array(1).fill(0));

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    }
  }

  // CCCS contributes only to the conductance matrix
  for (var obj = 0; obj < cccs_vs_list.length; obj++) {
    var n_k = parseInt(cccs_vs_list[obj].node_high) - 1;
    var n_l = parseInt(cccs_vs_list[obj].node_low) - 1;
    var ctrl_n_m = parseInt(cccs_vs_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(cccs_vs_list[obj].control_vol_node_low) - 1;
    var ctrl_ftr = parseFloat(cccs_vs_list[obj].control_factor);

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    }
  }
  // CCVS contributes only to the conductance matrix
  for (var obj = 0; obj < ccvs_gen_list.length; obj++) {
    var n_k = parseInt(ccvs_gen_list[obj].node_high) - 1;
    var n_l = parseInt(ccvs_gen_list[obj].node_low) - 1;
    var ctrl_n_m = parseInt(ccvs_gen_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(ccvs_gen_list[obj].control_vol_node_low) - 1;
    var transresistance = parseFloat(ccvs_gen_list[obj].trans_resistance);

    var new_var_V = "V_" + String(ctrl_n_m + 1) + "_";
    var var_list1 = var_list.slice(0, ctrl_n_m + 1);
    var_list1.push(new_var_V);
    var_list2 = var_list1.concat(var_list.slice(ctrl_n_m + 1));
    var_list = var_list2;

    var cond_matrix1 = cond_matrix.slice(0, ctrl_n_m + 1);

    cond_matrix1.push(Array(size).fill(0));
    cond_matrix1 = cond_matrix1.concat(cond_matrix.slice(ctrl_n_m + 1));
    cond_matrix = cond_matrix1;
    var cond_matrix2 = cond_matrix
      .slice(0)
      .map((i) => i.slice(0, ctrl_n_m + 1));
    var cond_matrix3 = cond_matrix.slice(0).map((i) => i.slice(ctrl_n_m + 1));
    for (var j = 0; j < cond_matrix2.length; j++) {
      cond_matrix2[j][cond_matrix2[j].length] = 0;
    }

    var cond_matrix4 = [];
    for (var i = 0; i < cond_matrix2.length; i++) {
      cond_matrix4[i] = cond_matrix2[i].concat(cond_matrix3[i]);
    }
    cond_matrix = cond_matrix4;

    curr_matrix1 = curr_matrix.slice(0, ctrl_n_m + 1);
    curr_matrix1.push(Array(1).fill(0));
    curr_matrix1 = curr_matrix1.concat(curr_matrix.slice(ctrl_n_m + 1));
    curr_matrix = curr_matrix1;

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    var length = cond_matrix[0].length;
    for (var j = 0; j < cond_matrix.length; j++) {
      cond_matrix[j][length] = 0;
    }
    curr_matrix.push(Array(1).fill(0));

    var new_var_I = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    length = cond_matrix[0].length;
    for (var j = 0; j < cond_matrix.length; j++) {
      cond_matrix[j][length] = 0;
    }
    curr_matrix.push(Array(1).fill(0));

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    var i_kl = var_list.indexOf("I_" + String(n_k + 1) + "_" + String(n_l + 1));
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_n + 1));
    }
    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] -= 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    }
  }

  // CCVS contributes only to the conductance matrix
  for (var obj = 0; obj < ccvs_vs_list.length; obj++) {
    var n_k = parseInt(ccvs_vs_list[obj].node_high) - 1;
    var n_l = parseInt(ccvs_vs_list[obj].node_low) - 1;
    var ctrl_n_m = parseInt(ccvs_vs_list[obj].control_vol_node_high) - 1;
    var ctrl_n_n = parseInt(ccvs_vs_list[obj].control_vol_node_low) - 1;
    var transresistance = parseFloat(ccvs_vs_list[obj].trans_resistance);

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(size).fill(0));
    for (var j = 0; j < size; j++) {
      cond_matrix[i][size] = 0;
    }
    curr_matrix.push(0);

    var new_var_I = "I_" + String(n_k + 1) + "_" + String(n_k + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(size).fill(0));
    for (var j = 0; j < size; j++) {
      cond_matrix[i][size] = 0;
    }
    curr_matrix.push(0);

    var i_mn = var_list.index(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    var i_kl = var_list.indexOf("I_" + String(n_k + 1) + "_" + String(n_l + 1));
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    }
  }

  for (var obj = 0; obj < resistor_list.length; obj++) {
    var n_k = parseInt(resistor_list[obj].node_high);
    console.log("n_k: ", n_k)

    var n_l = parseInt(resistor_list[obj].node_low);
    console.log("n_l: ", n_l)

    if (ccvs_gen_list.length > 0) {
      var ccvs_high = parseInt(ccvs_gen_list[0].control_vol_node_high);
      console.log("ccvs_high: ", ccvs_high)
      var ccvs_low = parseInt(ccvs_gen_list[0].control_vol_node_low);
      console.log("ccvs_low: ", ccvs_low)

      if (n_l == ccvs_high && n_k == ccvs_low) {
        var temp = n_l;
        n_l = n_k;
        n_k = temp;
        if (n_l <= ccvs_high) {
          n_l = n_l - 1;
        }
      } else if (n_k == ccvs_high && n_l == ccvs_low) {
        n_k = n_k;
        if (n_l <= ccvs_high) {
          n_l = n_l - 1;
        }
      } else if (n_l <= ccvs_high && n_k <= ccvs_high) {
        n_l = n_l - 1;
        n_k = n_k - 1;
      } else if (n_k <= ccvs_high && n_l > ccvs_high) {
        n_k = n_k - 1;
      } else if (n_l <= ccvs_high && n_k > ccvs_high) {
        n_l = n_l - 1;
      }
    } else if (cccs_gen_list.length > 0) {
      var cccs_high = parseInt(cccs_gen_list[0].control_vol_node_high);
      var cccs_low = parseInt(cccs_gen_list[0].control_vol_node_low);

      if (n_l == cccs_high && n_k == cccs_low) {
        var temp = n_l;
        n_l = n_k;
        n_k = temp;
        if (n_l <= cccs_high) {
          n_l = n_l - 1;
        }
      } else if (n_k == cccs_high && n_l == cccs_low) {
        n_k = n_k;
        if (n_l <= cccs_high) {
          n_l = n_l - 1;
        }
      } else if (n_l <= cccs_high && n_k <= cccs_high) {
        n_l = n_l - 1;
        n_k = n_k - 1;
      } else if (n_k <= cccs_high && n_l > cccs_high) {
        n_k = n_k - 1;
      } else if (n_l <= cccs_high && n_k > cccs_high) {
        n_l = n_l - 1;
      }
    } else {
      n_k = n_k - 1;
      n_l = n_l - 1;
    }
        console.log("n_k_after: ", n_k)
                console.log("n_l_after: ", n_l)


    var conductance = 1.0 / parseFloat(resistor_list[obj].resistor_value);

    if (n_k != -1 && n_l != -1) {
      cond_matrix[n_k][n_k] += conductance;
      cond_matrix[n_k][n_l] -= conductance;
      cond_matrix[n_l][n_k] -= conductance;
      cond_matrix[n_l][n_l] += conductance;
    } else if (n_k == -1 && n_l != -1) {
      cond_matrix[n_l][n_l] += conductance;
    } else if (n_l == -1 && n_k != -1) {
      cond_matrix[n_k][n_k] += conductance;
    }
  }
  try {
    console.log("cond_matrix_final: ", cond_matrix);
    cond_matrix_inv = math.inv(cond_matrix);
    output_matrix = math.multiply(cond_matrix_inv, curr_matrix);

    // <div class="hover_bkgr_fricc">
    //     <span class="helper"></span>
    //     <div>
    //         <h1>Docs</h1>
    //         <div class="popupCloseButton">&times;</div>
    //         <p>Add any HTML content<br />inside the popup box!</p>
    //     </div>
    // </div>

    // var div_head = document.createElement("div");
    // div_head.setAttribute("class", "hover_bkgr_fricc");
    // var span = document.createElement("span");
    // span.setAttribute("class", "helper");
    // div_head.appendChild(span);
    // var div = document.createElement("div");
    // var h1 = document.createElement("h4");
    // h1.innerHTML = "Output";
    // h1.appendChild(div);
    // var popupCloseButton = document.createElement("div");
    // popupCloseButton.setAttribute("class", "popupCloseButton");
    // popupCloseButton.innerHTML = "&times;";
    // div.appendChild(popupCloseButton);

    // for (var i = 0; i < var_list.length; i++) {
    //   if (var_list[i][0] == "V") {
    //     var matrix = document.createElement("h2");
    //     matrix.setAttribute("class", "card-text");
    //     matrix.innerHTML =
    //       var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " V ";
    //     div.appendChild(matrix);
    //   }

    //   if (var_list[i][0] == "I") {
    //     var matrix = document.createElement("h2");
    //     matrix.innerHTML =
    //       var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " A ";
    //     matrix.setAttribute("class", "card-text");

    //     div.appendChild(matrix);
    //   }
    // }
    // div_head.appendChild(div);
    // document.body.appendChild(div_head);
    // document.body.innerHTML = "";

    var div_top = document.createElement("div");
    div_top.setAttribute("class", "modal fade");
    div_top.setAttribute("id", "output");
    div_top.setAttribute("data-backdrop", "static");
    div_top.setAttribute("data-keyboard", "false");
    div_top.setAttribute("tabindex", "-1");
    div_top.setAttribute("aria-labelledby", "staticBackdropLabel");
    div_top.setAttribute("aria-hidden", "true");

    var modal_dialog = document.createElement("div");
    modal_dialog.setAttribute("class", "modal-dialog");


    var modal_content = document.createElement("div");
    modal_content.setAttribute("class", "modal-content");

    var modal_header = document.createElement("div");
    modal_header.setAttribute("class", "modal-header");

    var modal_title = document.createElement("h5");
    modal_title.setAttribute("class", "modal-title text-center");
    modal_title.setAttribute("id", "staticBackdropLabel");
    modal_title.innerHTML = "Output";
    modal_header.appendChild(modal_title);

    // var button = document.createElement("button");
    // button.setAttribute("class", "close");
    // button.setAttribute("type", "button");
    // button.setAttribute("data-dismiss", "modal");
    // button.setAttribute("aria-label", "Close");

    // var span = document.createElement("span");
    // span.setAttribute("aria-hidden", "true");
    // span.innerHTML = "&times;";
    // button.appendChild(span);

    // modal_header.appendChild(button);
    modal_content.appendChild(modal_header);

    var modal_body = document.createElement("div");
    modal_body.setAttribute("class", "modal-body");
    for (var i = 0; i < var_list.length; i++) {
      if (var_list[i][0] == "V") {
        var matrix = document.createElement("h2");
        matrix.setAttribute("class", "card-text");
        matrix.innerHTML =
          var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " V ";
        modal_body.appendChild(matrix);
      }

      if (var_list[i][0] == "I") {
        var matrix = document.createElement("h2");
        matrix.innerHTML =
          var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " A ";
        matrix.setAttribute("class", "card-text");

        modal_body.appendChild(matrix);
      }
    }
    modal_content.appendChild(modal_body);

    var modal_footer = document.createElement("div");
    modal_footer.setAttribute("class", "modal-footer");
    // var button1 = document.createElement("button");
    // button1.setAttribute("type", "button");
    // button1.setAttribute("class", "btn btn-secondary");
    // button1.setAttribute("data-dismiss", "modal");

    // button1.setAttribute("onclick", "inputReset()");

    // button1.innerHTML = "Ok";
    // modal_footer.appendChild(button1);

    var button2 = document.createElement("button");
    button2.setAttribute("type", "submit");
    button2.setAttribute("class", "btn btn-primary");
    button2.setAttribute("onclick", "window.location.reload();");

    button2.innerHTML = "Try again";
    modal_footer.appendChild(button2);
    modal_content.appendChild(modal_footer);

    // modal_content.appendChild(modal_header)
    modal_dialog.appendChild(modal_content);
    div_top.appendChild(modal_dialog);
    document.body.appendChild(div_top);

    // var output = document.createElement("form");
    // output.setAttribute(
    //   "class",
    //   "output card card-body text-white bg-dark mb-3"
    // );

    // var header = document.createElement("div");
    // header.setAttribute("class", "card-header");
    // header.innerHTML = "Output";
    // output.appendChild(header);

    // for (var i = 0; i < var_list.length; i++) {
    //   if (var_list[i][0] == "V") {
    //     var matrix = document.createElement("h2");
    //     matrix.setAttribute("class", "card-text");
    //     matrix.innerHTML =
    //       var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " V ";
    //     output.appendChild(matrix);
    //   }

    //   if (var_list[i][0] == "I") {
    //     var matrix = document.createElement("h2");
    //     matrix.innerHTML =
    //       var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " A ";
    //     matrix.setAttribute("class", "card-text");

    //     output.appendChild(matrix);
    //   }
    // }
    // document.body.appendChild(output);
    // var size = parseInt(nodes) + ele_count["volt_src"] + ele_count["vcvs"];

    // cond_matrix = Array(size)
    //   .fill()
    //   .map(() => Array(size).fill(0));
    // console.log("cond_matrix_final: ", cond_matrix);
  } catch (error) {
    alert(error);
  }

  window.scrollTo(0, document.body.scrollHeight);
}
