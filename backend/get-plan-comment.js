class Comment {
    constructor(data) {
      this.contents = data.contents;
      this.date = data.created_at;
      this.username=data.username;
    }
  
    render() {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("comment");
  
      const contentsParagraph = document.createElement("p");
      contentsParagraph.textContent = this.contents;

      const userPhrapraph = document.createElement("p");
      userPhrapraph.textContent = this.username;

      const dateParagraph = document.createElement("time");
      const shortenedDate = this.date.substring(0, 10); 
      dateParagraph.textContent = shortenedDate;
      
      dateParagraph.setAttribute("datetime", this.date);
      
      commentContainer.appendChild(userPhrapraph);
      commentContainer.appendChild(contentsParagraph);
      commentContainer.appendChild(dateParagraph);
  
      return commentContainer;
    }
  }
  
  class CommentRender {
    constructor(apiUrl, targetSelector) {
      this._apiUrl = apiUrl;
      this._targetSelector = targetSelector;
    }
  
    async fetchAndRender() {
      try {
        const response = await fetch(this._apiUrl);
        const data = await response.json();
  
        const targetElement = document.querySelector(this._targetSelector);
  
        data.forEach(commentData => {
          const comment = new Comment(commentData);
          const commentElement = comment.render();
          targetElement.appendChild(commentElement);
        });
      } catch (error) {
        console.error("Error fetching or parsing data:", error.message);
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planName = urlParams.get("planName");
    if (planName) {
      const apiUrl = `http://localhost:3000/notes/${encodeURIComponent(planName)}`;
      const commentRenderer = new CommentRender(apiUrl, ".commentContainer");
      commentRenderer.fetchAndRender();
    } else {
      console.error("planName parameter is missing in the URL.");
    }
  });
  