

import {Component} from "react"


import swal from 'sweetalert'

import {v4 as uuidv4} from "uuid"



import "./index.css"




const posts=[
    {
        id:uuidv4(),
        title:"Post 1",
        content:"This is the content of post 1",
        author:"John Doe",
      
    }
    ,
    {
        id:uuidv4(),
        title:"Post 2",
        content:"This is the content of post 2",
        author:"ALex Doe",
     
    }
    ,
    {
        id:uuidv4(),
        title:"Post 3",
        content:"This is the content of post 3",
        author:"carlos",
      
    }
]

class Home extends Component {

    state={storageOfPosts:posts,title:"",content:"",author:"",id:0,editTitle:"",editContent:"",editAuthor:"",addingPost:false,editPost:false,darkMode:false}


    modifyAuthor=(e)=>{
        this.setState({editAuthor:e.target.value})
    }

    modifyContent=(e)=>{
        this.setState({editContent:e.target.value})
    }

    modifyTitle=(e)=>{
        this.setState({editTitle:e.target.value})
    }


    editPost=(id)=>{
       
        const findingPost=this.state.storageOfPosts.find(each=>each.id===id)

        const {title,content,author}=findingPost
        this.setState({editTitle:title,editContent:content,editAuthor:author,id:id,editPost:true})
    }

    savePost=()=>{
        const {storageOfPosts,id,editTitle,editContent,editAuthor}=this.state

        swal("Good job!", "Your post has been saved successfully!", "success");
       
        const findingPost=storageOfPosts.find(each=>each.id===id)
        const newPost={...findingPost,title:editTitle,content:editContent,author:editAuthor}
        const newStorageOfPosts=storageOfPosts.map(each=>each.id===id?newPost:each)
        this.setState({storageOfPosts:newStorageOfPosts,editTitle:"",editContent:"",editAuthor:"",id:0,editPost:false})

    }

    cancelEdit=()=>{
        this.setState({editPost:false})
    }


    newTitle=(event)=>{
        this.setState({title:event.target.value})

    }

    newAuthor=(event)=>{
        this.setState({author:event.target.value})

    }

    newContent=(event)=>{
            this.setState({content:event.target.value})
        }

    addingNewPost=()=>{
        swal("Good job!", "Your post has been added successfully!", "success");

        

     
        const {title,content,author,storageOfPosts}=this.state
        const newPost={id:uuidv4(),title:title,content:content,author:author}
        const newStorageOfPosts=storageOfPosts.concat(newPost)
        this.setState({storageOfPosts:newStorageOfPosts,title:"",content:"",author:"",addingPost:false})
    }

    showAddingPost=()=>{
        this.setState({addingPost:true})
    }

    hideAddingPost=()=>{
        this.setState({addingPost:false})
    }

    darkMode=()=>{
        this.setState({darkMode:true})
    }

    lightMode=()=>{
        this.setState({darkMode:false})
    }
     
  render() {
    const {storageOfPosts,title,content,author,editAuthor,editContent,editTitle,addingPost,editPost,darkMode}=this.state
    return (
      <div className={darkMode? "dark-mode-container" : "light-mode-container"}>

        <div className="nav-bar">
            <div>
                <img className="logo" src="https://i.ibb.co/cXfvNCy/smartphone-1184883.png" alt="not-found"/>
            </div>
                <h1 className={darkMode?"dark-header":"light-header"}>Welcome to the Posts App</h1>
                <div>
                    {
                        darkMode?
                        <button onClick={this.lightMode} type="button" className="light-mode-button">Light Mode</button>
                        :
    
                    <button onClick={this.darkMode} type="button" className="dark-mode-button">Dark Mode</button>
                     }


                </div>
          
        </div>

        <hr/>

        <div className="number-of-posts">
        <h2 className={darkMode?"dark-header":"light-header"}>Posts</h2>
        <h2 className={darkMode?"dark-header":"light-header"}>Number of posts: {storageOfPosts.length}</h2>
        </div>



    <div className="show-edit-add-container">

        <div className="post-container"> 
            <div>
                {
                    storageOfPosts.map((each)=>(
                        <div className="post" key={each.id}>
                            <h2 className="title-post">Title: {each.title}</h2>
                            <p>{each.content}</p>
                            <p>Author: {each.author}</p> 

                            <button onClick={()=>{this.editPost(each.id)}} className="edit-button" type="button">Edit</button>
                        </div>
                    ))
                }
            </div>

        </div>



        <div className="edit-add-container">
            
            {
                addingPost?
                <div className="add-post-container">
                <h2>Add Post</h2>
                <div>
                  
                    <input id="title" className="title" onChange={this.newTitle} value={title} type="text" placeholder="Title"/> <br/>
                  
                    <input id="content" className="content" onChange={this.newContent} value={content} type="text" placeholder="Content"/> <br/>
                  
                    <input id="author" className="author" onChange={this.newAuthor} value={author} type="text" placeholder="Author"/> <br/>
                    <button className="cancel-button" onClick={this.hideAddingPost} type="button">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="add-button" onClick={this.addingNewPost} type="button">Add</button>
                   
                   
    
                </div>
                </div>:null
                
            }
          
          {
            editPost?
            <div className="edit-post-container">
            <h2>Edit</h2>

            <div>
                <input className="title" onChange={this.modifyTitle} value={editTitle} type="text" placeholder="Title"/><br/>
                <input className="content" onChange={this.modifyContent} value={editContent} type="text" placeholder="Content"/><br/>
                <input className="author"onChange={this.modifyAuthor} value={editAuthor} type="text" placeholder="Author"/><br/>
                <button className="cancel-button" onClick={this.cancelEdit} type="button">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="save-button" onClick={this.savePost} type="button">Save</button>
                
               
            </div>
            </div>:null
                    
          }

          
        
        </div>

    </div>



        <div className={darkMode? "dark-mode-footer" : "light-mode-footer"}>
            <div>
                <button onClick={this.showAddingPost} className="add-post-button" type="button">Add Post</button>
            </div>
        </div>



      







      </div>
    );
  }
}

export default Home;