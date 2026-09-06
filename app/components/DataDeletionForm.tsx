"use client";

import { useActionState } from "react";
import {
  requestDataDeletion,
  type DataDeletionState,
} from "@/app/actions/request-data-deletion";
import styles from "./DataDeletionForm.module.css";

const initialState: DataDeletionState = {
  status: "idle",
  message: "",
};

export default function DataDeletionForm() {
  const [state, formAction, pending] = useActionState(
    requestDataDeletion,
    initialState,
  );
  const submitted = state.status === "success";

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="deletion-email">Email address</label>
        <input
          autoComplete="email"
          disabled={submitted}
          id="deletion-email"
          inputMode="email"
          maxLength={254}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <p className={styles.hint}>
          Use the email address linked to your biu account.
        </p>
      </div>

      <fieldset className={styles.field}>
        <legend>How did you sign in?</legend>
        <div className={styles.radioGroup}>
          <label className={styles.radio}>
            <input
              disabled={submitted}
              name="authProvider"
              required
              type="radio"
              value="google"
            />
            <span>Google</span>
          </label>
          <label className={styles.radio}>
            <input
              disabled={submitted}
              name="authProvider"
              required
              type="radio"
              value="apple"
            />
            <span>Apple</span>
          </label>
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="deletion-reason">Reason for deletion</label>
        <textarea
          disabled={submitted}
          id="deletion-reason"
          maxLength={2000}
          name="reason"
          placeholder="tell us why you want your data deleted…"
          required
          rows={5}
        />
      </div>

      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="deletion-company">Company</label>
        <input
          autoComplete="off"
          id="deletion-company"
          name="company"
          tabIndex={-1}
          type="text"
        />
      </div>

      <button
        className={styles.submit}
        disabled={pending || submitted}
        type="submit"
      >
        {pending
          ? "sending…"
          : submitted
            ? "request received"
            : "request data deletion"}
      </button>

      {state.message ? (
        <p
          className={`${styles.message} ${
            state.status === "error" ? styles.error : ""
          }`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
