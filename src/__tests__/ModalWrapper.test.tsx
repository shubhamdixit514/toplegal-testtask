import React from "react";
import { screen, render } from "@testing-library/react";
import ModalWrap from "components/ModalWrapper";
import userEvent from "@testing-library/user-event";

const TEST_MODAL_SPEC = 'Test Modal'

const TestModal = () => <p>{TEST_MODAL_SPEC}</p>

describe("<ModalWrapper/> Component", () => {
  const mockClose = jest.fn()

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render successfully", () => {
    render(<ModalWrap open handleClose={mockClose}><TestModal/></ModalWrap>)
    expect(screen.getByText(TEST_MODAL_SPEC)).not.toBeNull()
  });
  it("should not render without open as true", () => {
    render(<ModalWrap handleClose={mockClose}><TestModal/></ModalWrap>)
    expect(screen.queryByText(TEST_MODAL_SPEC)).toBeNull()
  });
  it("should close successfully", () => {
    render(<ModalWrap open handleClose={mockClose}><TestModal/></ModalWrap>)
    userEvent.keyboard('{esc}');
    expect(mockClose).toBeCalledTimes(1)
  });
});
