/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import "./global.css"

const Layout = ({ children }) => {
  const styles = {
    color: "text",
    backgroundColor: "background",
    maxWidth: "container",
    fontFamily: "body",
    lineHeight: "body",
    padding: 4,
    margin: "0 auto",

    a: {
      color: "primary",
    },
  }
  return (
    <div
      sx={{
        backgroundColor: "background",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div sx={styles}>{children}</div>
    </div>
  )
}

export default Layout
