function grade(score) {
  if (score > 100 || score < 0) {
    return "잘못된  점수입니다.";
  } else if (score <= 59) {
    return "F";
  } else if (score <= 69) {
    return "D";
  } else if (score <= 79) {
    return "C";
  } else if (score <= 89) {
    return "B";
  } else {
    return "A";
  }
}
grade();
