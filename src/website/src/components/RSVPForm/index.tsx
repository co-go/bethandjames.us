import React, { FC, ReactNode, useState } from 'react';
import styles from './RSVPForm.module.sass';
import cx from "classnames";
import ActionButton from './ActionButton';
import toast, { Toaster } from 'react-hot-toast';
import { useBeforeunload } from 'react-beforeunload';
import Select from './Select';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const submitForm = async (name: string, rsvpee: string, attendance: string, entree: string) => {
  await sleep(1000)
  console.log(name, rsvpee, attendance, entree)
  return true
}

const RSVPForm: FC = () => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [name, setName] = useState("");
  const [rsvpee, setRsvpee] = useState("");
  const [attendance, setAttendance] = useState("");
  const [entree, setEntree] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [brunch, setBrunch] = useState("");
  const [covid, setCovid] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [party, setParty] = useState(["James Corley"])

  useBeforeunload((event) => {
    if (name.trim().length > 0 && !submitted) {
      event.preventDefault();
    }
  });

  const youOrName = (name === rsvpee || rsvpee === "") ? "you" : rsvpee.split(" ")[0]
  let submitText = <><i>Woohoo!</i> We can't wait to party with {youOrName}.</>

  if (attendance === "No") {
    submitText = <><i>That's okay!</i> {youOrName.charAt(0).toUpperCase() + youOrName.slice(1)} will be missed!</>
  }

  const questions = [
    {
      question: <><i>Hey there!</i> What is your name?</>,
      warning: "Oops! That name was not found. Please ensure it matches with your invitation.",
      onNext: async () => {
        await sleep(2000);
        return true
      },
      input: <input className={cx(styles.input, name.length > 0 && styles.filled)} type="text" placeholder="Joe Smith" onChange={(e) => setName(e.target.value)} />,
      value: name
    },
    {
      question: <><b>Thanks {name}!</b> Who do you want to RSVP for?</>,
      input: <Select name="rsvpee" options={party} onChange={(e) => setRsvpee(e.target.value)} />,
      value: rsvpee
    },
    {
      question: <>Will {youOrName} be able to attend our wedding celebration on Feburary 11th, 2023?</>,
      input: <Select name="attendance" options={["Yes", "No"]} onChange={(e) => setAttendance(e.target.value)} />,
      value: attendance,
      triggerSubmit: attendance === "No"
    },
    {
      question: <>What would {youOrName} like for an entrée?</>,
      input: <Select name="entree" options={["Vegan Eggplant Parmesan", "Vegan Cauliflower Steak"]} onChange={(e) => setEntree(e.target.value)} />,
      value: entree
    },
    {
      question: <>Any dietary restrictions?</>,
      input: <input className={cx(styles.input, restrictions.length > 0 && styles.filled)} type="text" placeholder="Gluten Free, Allergies, etc." onChange={(e) => setRestrictions(e.target.value)} />,
      value: restrictions
    },
    {
      question: <>Will {youOrName} be attending the brunch on Feburary 12th?</>,
      input: <Select name="brunch" options={["Yes", "No"]} onChange={(e) => setBrunch(e.target.value)} />,
      value: brunch
    },
    {
      question: <>COVID-19 is sirius.</>,
      input: <Select name="covid" options={["I acknoledge"]} onChange={(e) => setCovid(e.target.value)} />,
      value: covid,
      triggerSubmit: true
    },
    { question: submitText }
  ]

  if (party.length === 1) {
    questions.splice(1, 1)
  }

  return (
    <div className={styles.container}>
      {questions.map((q, i) => {
        let questionModifier = styles.current
        if (currQuestion < i) {
          questionModifier = styles.after
        } else if (currQuestion > i) {
          questionModifier = styles.before
        }

        if (i === questions.length - 1) {
          return <Question
            key={`${i}-question`}
            className={questionModifier}
            question={q.question}
            actions={[
              <React.Fragment key="re-rsvp">{party.length > 1 && <ActionButton type="text" text="RSVP for another member of your party" onClick={async (e) => setCurrQuestion(2)} />}</React.Fragment>,
              <ActionButton key="home" type="link" text="Back to Home" href={"https://bethandjames.us"} />,
            ]}
          />
        }

        return (
          <Question
            key={`${i}-question`}
            number={i+1}
            className={questionModifier}
            question={q.question}
            input={q.input}
            actions={[
              <ActionButton
                key={`${i}-back`}
                type="back"
                disabled={i === 0}
                onClick={async () => setCurrQuestion(i - 1)}
              />,
              <ActionButton
                key={`${i}-next`}
                type={(q.triggerSubmit && "submit") || "next"}
                disabled={i === questions.length - 1 || q.value?.trim().length === 0}
                onClick={async () => {
                  if (q.triggerSubmit) {
                    if (await submitForm(name, rsvpee, attendance, entree)) {
                      setCurrQuestion(questions.length - 1)
                      setSubmitted(true)
                    } else {
                      toast.error("Unable to submit form, please try again!")
                    }
                    return
                  }

                  if (!q.onNext || await q.onNext()) {
                    setCurrQuestion(i + 1)
                  } else {
                    toast.error(q.warning || "Unknown Error")
                  }
                }}
              />
            ]}
          />
        )
      })}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            WebkitTransform: "translateZ(0)"
          },
        }}
      />
    </div>
  )
}

interface QuestionProps {
  number?: number
  question: ReactNode
  className: string
  actions: Array<ReactNode>
  input?: ReactNode
}

const Question: FC<QuestionProps> = ({ number, question, className, actions, input }) => {
  return (
    <div className={cx(styles.content, className)}>
      <div className={styles.positioner}>
        <div className={styles.questionWrapper}>
          {number && <div className={styles.questionNumberWrapper}>
            <div className={styles.questionNumber}>{number}.</div>
          </div>}
          <div className={styles.question}>{question}</div>
        </div>
        <div className={styles.inputContainer}>
          {input}
        </div>
        <div className={styles.actionContainer}>
          {actions}
        </div>
      </div>
    </div>
  )
}

export default RSVPForm;
