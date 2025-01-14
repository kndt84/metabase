import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SlackSetup from "./SlackSetup";

const FormMock = () => <div />;

describe("SlackSetup", () => {
  it("should toggle setup sections", () => {
    render(<SlackSetup Form={FormMock} />);
    expect(screen.getByText("Create New App")).toBeInTheDocument();

    userEvent.click(screen.getByText("1. Create your Slack App"));
    expect(screen.queryByText("Create New App")).not.toBeInTheDocument();

    userEvent.click(screen.getByText("1. Create your Slack App"));
    expect(screen.getByText("Create New App")).toBeInTheDocument();
  });

  it("should render the page when there is no existing bot", () => {
    render(<SlackSetup Form={FormMock} isBot={false} />);

    expect(screen.getByText(/Metabase to your Slack/)).toBeInTheDocument();
  });

  it("should render the page when there is an existing bot", () => {
    render(<SlackSetup Form={FormMock} isBot={true} />);

    expect(screen.getByText("upgrade to Slack Apps")).toBeInTheDocument();
  });
});
