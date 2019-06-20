let numOptions = 3;








const attachAddOptionButton = () => {
  const button = $("<button>").attr("id", "add-option").text("Add an Option");
  button.click(function(event) {
    event.preventDefault();
    numOptions++;
    addOptionInput(numOptions);
  })
  $("#submit").after(button);
}

const addOptionInput = (numOptions) => {
  const label = $("<label>").attr("for", `option${numOptions}`).text(`Option ${numOptions}`);
  const inputField = $("<input>").attr("type", "text").attr("name", `option${numOptions}`);
  $("form").append(label, inputField, $("<br>"));
}

$(() => {
  //append 3 option input fields
  for (let i = 1; i <= 3; i++) {
    addOptionInput(i);
  }
  $("<input>").attr("type", "submit").attr("id", "submit").val("submit").appendTo($("form"));
  attachAddOptionButton();
});
