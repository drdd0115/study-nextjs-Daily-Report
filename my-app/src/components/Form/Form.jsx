import React, { useState } from 'react'
import styles from './Form.module.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';


export default function Form() {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [comment, setComment] = useState('');

  const submitReport = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "reports"), {
        date: new Date(),
        name: name,
        task: task,
        comment: comment
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitReport}>

      <div className={styles.formList}>
        <label className={styles.formTitle} htmlFor="name">Name:</label>
        <div className={styles.formField}>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>

      <div className={styles.formList}>
        <label className={styles.formTitle} htmlFor="task">Task:</label>
        <div className={styles.formField}>
          <input type="text" id="task" value={task} onChange={(e) => setTask(e.target.value)} />
        </div>
      </div>

      <div className={styles.formList}>
        <label className={styles.formTitle} htmlFor="comment">Comment:</label>
        <div className={styles.formField}>
          <textarea name="comment" id="comment" rows="4" cols="50" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </div>
      </div>

      <div className={styles.formButton}>
        <button className={styles.formButtonElm} type="submit">Submit</button>
      </div>

    </form>
  )
}
