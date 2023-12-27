// export class Comment {
//     constructor(data) {
//       this.contents = data.contents;
//       this.date = data.created;
//     }
  
//     render() {
//       const commentContainer = document.createElement("div");
//       commentContainer.classList.add("comment");
  
//       const contentsParagraph = document.createElement("p");
//       contentsParagraph.textContent = this.contents;
  
//       const dateParagraph = document.createElement("time");
//       const shortenedDate = this.date.substring(0, 10); 
//       dateParagraph.textContent = shortenedDate;
  
//       commentContainer.appendChild(contentsParagraph);
//       commentContainer.appendChild(dateParagraph);
  
//       return commentContainer;
//     }
//   }