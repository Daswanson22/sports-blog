$(function() {
    // Add section
    $("#add").on("click", function() {
        console.log("Add Section");
        addSection();
    });

    // Delete section
    $(document).on("click", ".sub", function() {
        console.log("Subtract Section");
        deleteSection(this);
    });

    // Submit Section
    $("form").on("submit", function() {
        console.log("New Post!");
    })
});

function addSection() 
{
    var section = $('<div class="section-container"></div>');
    var input1 = $('<input/>').attr({
        type: "text",
        name: `title`,
        id: "article_subtitle",
    });

    var input2 = $('<textarea/>').attr({
        name: `content`,
        id: "article_content",
    });

    var label1 = $('<label/>').attr({
        for: `title`,
    });

    var label2 = $('<label/>').attr({
        for: `content`,
    });

    var button1 = $('<button/>').attr({
        type: "button",
        class: "sub",
    })

    label1.text("Subtitle");
    label2.text("Content");
    button1.text("- Delete Section");

    section.append(label1, input1, label2, input2, button1);
    section.insertBefore("#add");
}

function deleteSection(clickedButton)
{
    $(clickedButton).closest(".section-container").remove();
}