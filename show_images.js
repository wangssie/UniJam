function show_text(){

    var newText = document.createTextNode("You just clicked a button, congratulations!");

    document.body.appendChild(newText);
    
}

function show_img(){

    var img = document.createElement("img");

    img.src = "gautam_face.jpg";
    img.alt = "Mystery Face";
    img.width = 300;
    img.height = 400;

    document.body.appendChild(img);

}