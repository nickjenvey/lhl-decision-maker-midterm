const vote = () => {
  const options = [];
  $(".sortable .option").each(function(index, value) {
    options.push({
      option: $(value).text().trim(),
      rank: Number(index),
    });
  });
  const url = `/${$("#user").data("id")}`;
  $.post(url, { options: options }, function(data) {
    getResult();
  });
}

const getResult = () => {
  const url = `/${$("#user").data("id")}/result`;
  $.getJSON(url, function(data) {
    data.forEach(element => {
      $("<div>").addClass("option").text(`${element[0]} has a ranking of ${Math.round(element[1]*100)/100}`).appendTo($("#result-panel"));
    });
    $("#result-panel").slideDown();
    $(".sortable").remove();
  });
}

let voted = false;
let resultShown = false;

$(() => {

  $("#vote").click(function() {
    vote();
    $(this).hide();
  });
  // $("#result").click(function() {
  //   if (!resultShown) {
  //     getResult();
  //     resultShown = true;
  //   } else {
  //     $("#result-panel .option").remove();
  //     $("#result-panel").slideUp();
  //     resultShown = false;
  //   }
  // });

  //added sortable
  $(".sortable").sortable();
  $(".sortable").disableSelection();

})
