import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './RSVPForm.module.sass';
import cx from "classnames";
import axios from 'axios';
import ActionButton from './ActionButton';
import { ReactComponent as Arrow } from "./arrow-right-solid.svg"
import toast, { Toaster } from 'react-hot-toast';
import { useBeforeunload } from 'react-beforeunload';
import Select from './Select';
import { Link } from 'react-router-dom';
import * as Sentry from "@sentry/react";

const API_URL = 'https://zdk7dzkucirjhsa57w6ognt6pe0hzine.lambda-url.us-east-1.on.aws/rsvp';

const submitForm = async (name: string, attendance: string, entree: string, restrictions: string, brunch: string, covid: string) => {
  try {
    await axios.post(API_URL, {
      name,
      attendingEvent: attendance,
      entree,
      restrictions,
      attendingBrunch: brunch,
      covid
    })
  } catch(e) {
    Sentry.captureException(e);
    return false
  }

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
  const [isInvitedToBrunch, setIsInvitedToBrunch] = useState(false);
  const [covid, setCovid] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [party, setParty] = useState(["James Corley"])

  const getRsvpDetails = async (rsvpName: string) => {
    try {
      const res = await axios.get(API_URL, { params: { name: rsvpName } })

      if (res.data.result === null) {
        toast.error(`Oops! Name '${rsvpName}' was not found on our list. Please ensure it matches with your invitation (case-sensitive). If you are entering it correctly, reach out to James!`)
        Sentry.captureMessage(`Unable to find name '${rsvpName}'`);
        return false
      }

      setIsInvitedToBrunch(res.data.result.brunch)
      setParty(res.data.result.groupMembers)
      setAttendance(res.data.result.attendingEvent || "")
      setEntree(res.data.result.entree || "")
      setBrunch(res.data.result.attendingBrunch || "")
      setRestrictions(res.data.result.restrictions || "")
      setCovid(res.data.result.covid || "")
      return true
    } catch (e) {
      Sentry.captureException(e)
      toast.error(`Server error when looking up '${rsvpName}'. Please try again.`)
    }
    return false
  }

  useEffect(() => {
    if (rsvpee.trim() !== "") {
      getRsvpDetails(rsvpee)
    }
  }, [rsvpee])

  useBeforeunload((event) => {
    if (name.trim().length > 0 && !submitted) {
      event.preventDefault();
    }
  });

  const youOrName = (name === rsvpee || rsvpee === "") ? "you" : rsvpee.split(" ")[0]
  let submitText = <><i>Woohoo!</i> Thanks for RSVPing! We can't wait to party with {youOrName}. Feel free to edit these responses at any time before January 14th, 2023.</>

  if (attendance === "No") {
    submitText = <><i>That's okay!</i> {youOrName.charAt(0).toUpperCase() + youOrName.slice(1)} will be missed!</>
  }

  const questions = [
    {
      question: <><i>Hey there!</i> What is your name?</>,
      onNext: async () => {
        const prettyName = name.trim().split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
        setName(prettyName)
        return getRsvpDetails(prettyName)
      },
      input: <input className={cx(styles.input, name.length > 0 && styles.filled)} type="text" placeholder="Joe Smith" onChange={(e) => setName(e.target.value)} value={name} />,
      value: name
    },
    {
      question: <><b>Thanks {name}!</b> Who do you want to RSVP for?</>,
      input: <Select name="rsvpee" options={party.map(p => ({ value: p, node: <>{p}</>}))} onChange={(e) => setRsvpee(e.target.value)} value={rsvpee} />,
      value: rsvpee
    },
    {
      question: <>Will {youOrName} be able to attend our wedding celebration on Feburary 11th, 2023?</>,
      input: <Select name="attendance" options={["Yes", "No"].map(p => ({ value: p, node: <>{p}</>}))} onChange={(e) => setAttendance(e.target.value)} value={attendance} />,
      value: attendance,
      triggerSubmit: attendance === "No"
    },
    {
      question: <>What would {youOrName} like for an entrée?</>,
      input: <Select
        name="entree"
        options={[
          { value: "Roasted Cauliflower Steak", node: <div><b>Vegan Cauliflower Steak (V)(GF)</b><p style={{ margin: 0 }}>oyster mushrooms, honeyboat squash mousseline, green garlic sage vegan butter, charred hearty greens, currants</p></div>},
          { value: "Eggplant \"Parmesan\"", node: <div><b>Eggplant "Parmesan" (V)(GF)</b><p style={{ margin: 0 }}>gluten free panko-herb crusted eggplant, pomodoro arabiata, charred rapini pesto, gluten free orzo, garlic chips, roasted tiny tomatoes, nutritional yeast</p></div>},
        ]}
        onChange={(e) => setEntree(e.target.value)}
        value={entree}
      />,
      value: entree
    },
    {
      question: <>Any allergies/dietary restrictions?</>,
      input: <input className={cx(styles.input, restrictions.length > 0 && styles.filled)} type="text" placeholder="Gluten Free, Allergies, etc." onChange={(e) => setRestrictions(e.target.value)} value={restrictions} />,
      value: restrictions
    },
    {
      question: <>
        You are also invited to a brunch on February 12th, 2023. Will {youOrName} be attending the brunch? <i>If you aren't sure, just pick one and you can change at any point later!</i>

        <hr />

        <small>located at:</small><br />
        <b>LIORA</b><br />
        <span>414 Light St, Baltimore, MD 21202</span><br />
        <span>from 8:30 AM to 11 AM</span>
      </>,
      input: <Select name="brunch" options={["Yes", "No"].map(p => ({ value: p, node: <>{p}</>}))} onChange={(e) => setBrunch(e.target.value)} value={brunch} />,
      value: brunch
    },
    {
      question: <span>
        We are so fortunate to have 8 grandparents attending our wedding reception. Their well-being is our main concern. Please be mindful of any cold/flu/covid symptoms, that you may experience prior to the reception. Of course, if you are feeling unwell 24-48 hours prior, or if you know you have been exposed - please take care of yourself and stay home. You will be missed, but as stated, the compassionate and caring choice is for all to be well, especially the elderly and immunocompromised that will be at the reception. Along this same line of thought is the consideration of Covid protection through vaccination/booster.
        <br /><br />
        <b>If you are not vaccinated, with at least 1 follow-up booster shot - please do not attend the reception.</b>
        <br /><br />
        Please consider self-testing before the reception. Getting together with family and friends to celebrate joyous occasions is so special. We look forward to seeing you all in good health, and with your dancing shoes on.
      </span>,
      input: <Select name="covid" options={["Vaccinated with at least one booster", "Exempt and will contact Beth/James to clarify"].map(p => ({ value: p, node: <>{p}</>}))} onChange={(e) => setCovid(e.target.value)} value={covid} />,
      value: covid,
      triggerSubmit: true
    },
    { question: submitText }
  ]

  if (party.length === 1) {
    questions.splice(1, 1)
  }

  if (!isInvitedToBrunch) {
    questions.splice(questions.length - 3, 1)
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backHome}><Arrow className={styles.backIcon} /> back to home</Link>
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
              <React.Fragment key="re-rsvp">{party.length > 1 && <ActionButton type="text" text="RSVP for another member of your party" onClick={async (e) => setCurrQuestion(1)} />}</React.Fragment>,
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
                    if (await submitForm(rsvpee || name, attendance, entree, restrictions, brunch, covid)) {
                      setCurrQuestion(questions.length - 1)
                      setSubmitted(true)
                    } else {
                      toast.error("Unable to submit form, please try again!")
                    }
                    return
                  }

                  if (!q.onNext || await q.onNext()) {
                    setCurrQuestion(i + 1)
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
          duration: 10000,
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
  const content = (new Date() > new Date("1/17/2023"))
    ? <h1>RSVPs are closed! Please reach out to Beth or James if you need to make adjustments.</h1>
    : <>
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
    </>

  return (
    <div className={cx(styles.content, className)}>
      <div className={styles.positioner}>
        {content}
      </div>
    </div>
  )
}

export default RSVPForm;
