// reducer.js
import { SET_INPUT, ADD_LECTURE, UPDATE_LECTURE, DELETE_LECTURE } from "./constraints";

const initialState = {
  lecturesData: [],
  input: {
    id: "",
    LectureUserName: "",
    LastName: "",
    MiddleName: "",
    FirstName: "",
    DateOfBirth: "",
    Gender: false,
    IDCard: "",
    Address: "",
    MobilePhone: "",
    Email: "",
    Fullname: "",
    IsActive: true,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    case ADD_LECTURE:
      return {
        ...state,
        lecturesData: [...state.lecturesData, action.payload],
      };

    case UPDATE_LECTURE:
      const lectureIndex = state.lecturesData.findIndex(
        (lecture) => lecture.id === action.payload.id
      );

      if (lectureIndex !== -1) {
        const updatedLectures = [...state.lecturesData];
        updatedLectures[lectureIndex] = action.payload;

        return {
          ...state,
          lecturesData: updatedLectures,
        };
      }
      return state;
    case DELETE_LECTURE:
      return {
        ...state,
        lecturesData: state.lecturesData.filter(
          (lecture) => lecture.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export { initialState };

export default reducer;
