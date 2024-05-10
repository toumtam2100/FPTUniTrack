// actions.js
import { SET_INPUT, ADD_LECTURE, UPDATE_LECTURE , DELETE_LECTURE } from "./constraints";

export const setInput = (inputData) => {
  return {
    type: SET_INPUT,
    payload: inputData,
  };
};

export const addLecture = (lecture) => {
  return {
    type: ADD_LECTURE,
    payload: lecture,
  };
};

export const updateLecture = (lecture) => {
  return {
    type: UPDATE_LECTURE,
    lecture,
  };
};

export const deleteLecture = (lectureId) => {
  return {
    type: DELETE_LECTURE,
    payload: lectureId,
  };
};
