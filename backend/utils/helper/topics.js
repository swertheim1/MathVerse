// fetch topics based on grade_level
function fetchTopics(grade_level) {
    return fetch(`/topics?grade_level=${grade_level}`)
      .then(response => response.json());
  }

//   update the topics page content
  function updateTopicsPage(topics) {
    // Update the page content with the fetched topics
  }

  const grade_level = '10'; // Get the grade_level from the user or some other source
    fetchTopics(grade_level)
    .then(topics => {
    updateTopicsPage(topics);
  })
  .catch(error => {
    console.error('Error fetching topics:', error);
  });