function play_again(play_more){
    let data = {play_more};
    const options = {
        method: 'POST',
        headers: {
        "Content-type": 'application/json'
        },
        body: JSON.stringify(data)

    };
    fetch('/end', options);

}


