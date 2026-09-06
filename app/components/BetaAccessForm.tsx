"use client";

import { useActionState } from "react";
import {
  requestBetaAccess,
  type BetaAccessState,
} from "@/app/actions/request-beta-access";
import styles from "./FinalCta.module.css";

const initialState: BetaAccessState = {
  status: "idle",
  message: "",
};

export default function BetaAccessForm() {
  const [state, formAction, pending] = useActionState(
    requestBetaAccess,
    initialState,
  );
  const submitted = state.status === "success";

  return (
    <form action={formAction} className={styles.betaForm}>
      <label className={styles.srOnly} htmlFor="beta-email">
        Email address
      </label>
      <input
        autoComplete="email"
        className={styles.betaInput}
        disabled={submitted}
        id="beta-email"
        inputMode="email"
        maxLength={254}
        name="email"
        placeholder="you@example.com"
        required
        type="email"
      />

      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="beta-company">Company</label>
        <input
          autoComplete="off"
          id="beta-company"
          name="company"
          tabIndex={-1}
          type="text"
        />
      </div>

      <button
        className={styles.betaButton}
        disabled={pending || submitted}
        type="submit"
      >
        {pending
          ? "requesting…"
          : submitted
            ? "request received"
            : "request beta access"}
      </button>

      {state.message ? (
        <p
          className={`${styles.betaMessage} ${
            state.status === "error" ? styles.betaError : ""
          }`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
