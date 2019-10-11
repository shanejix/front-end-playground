import React from "react";

//one

// export default function comment(props) {
//     // console.log({ author, content });
//     let { author, content }=props.comment

//     return (
//         <div>
//             <span>{author}</span>
//             <div>{content}</div>
//         </div>
//     );
// }

//another

export default function comment({ comment }) {
    // console.log({ author, content });
    let { author, content } = comment;

    return (
        <div>
            <span>{author}</span>
            <div>{content}</div>
        </div>
    );
}
