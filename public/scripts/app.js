let numOptions = 3;

const addOptionInput = (numOptions) => {
  const label = $("<label>").attr("for", `option${numOptions}`).text(`Option ${numOptions}`);
  const inputField = $("<input>").attr("type", "text").attr("name", `option${numOptions}`).addClass("option");
  $("#add-option").before(label, inputField, $("<br>"));
}

$(() => {
  //append 3 option input fields
  for (let i = 1; i <= 3; i++) {
    addOptionInput(i);
  }
  //give the add-option button functionality
  $("#add-option").click(function(event) {
    event.preventDefault();
    numOptions++;
    addOptionInput(numOptions);
    $("#num-options").val(numOptions);
  })
});
