const voteButton = () => {
  const options = [];
  $(".option").each(function(index, value) {
    options.push({
      option: $(value).text().trim(),
      rank: Number(index),
    });
  });
  const url = `/${$("#admin").data("id")}/admin`;
  $.post(url, { options: options }, function(data) {
    console.log(data);
  });
}



$(() => {
  $("#vote").click(function() {
    voteButton();
  });
  $("#result").click(function() {
    showResult();
  });
  //added sortable
  $(".sortable").sortable();
  $(".sortable").disableSelection();

})
