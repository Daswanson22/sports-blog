exports.invalid = function (input)
{
    var element = document.getElementById(`${input}`);
    var err = document.getElementById("error");
    element.val = '';
    err.innerText = `That ${input} already exists.`;
}
