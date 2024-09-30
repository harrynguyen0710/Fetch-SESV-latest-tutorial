// get the button element 
const fetchingBtn = document.getElementById('btn-get-lessons');

/*
input: none
process:
  + fetch data from backend and convert to JSON object
  + get the container layout
  + use a loop to iterate through an array of JSON object above and create new div elements and assign 
    the content of each element from the array.
  + append new div elements to the layout container to display to the users.
output: none
*/
const fetchLessons = () => {
  // hide the fetching button while the data is being fetched
  fetchingBtn.style.display = 'none'; 

  // url of backend to which the fetch request will be sent
  const url = 'http://localhost:3000/proxy';

  // retrieve the data from the server through fetch method
  fetch(url)
    // convert data to JSON to work with Javascript methods
    .then(response => response.json())

    // execute the next method for displaying data to the interface
    .then(info => {
      // get the container element where the data will be displayed.
      const container = document.getElementById('data-container');

      // access the 'edges' array within 'result' from json data.
      const posts = info.result.data.posts;

      // iterate through the array and create a new HTML element for displaying post's details
      posts.edges.forEach(item => {
        // access the title object
        const title = item.node.frontmatter.title; 

        // create a new div element for displaying the post's title, excerpt
        const itemDiv = document.createElement('div');

        // add classname for the created div
        itemDiv.className = 'data-item';

        // populate content of the div with post's title and excerpt
        itemDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${item.node.excerpt}</p>
        `;
        
        // append the new div element to the layout container in the DOM
        container.appendChild(itemDiv);
      });


      // show the button again after fetching completes
      fetchingBtn.style.display = 'block';
    })
    // catch an error if happens during fetching
    .catch(error => {
      console.error('Error fetching data:', error);

      // show the button again even if there is an error
      fetchingBtn.style.display = 'block';
    });  
}


// fetch data when users click to the button
fetchingBtn.addEventListener('click', fetchLessons);