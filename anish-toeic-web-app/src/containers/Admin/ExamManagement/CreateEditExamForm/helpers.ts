export const questionTypeOptions = [
  { value: "MultipleChoice", label: "Multiple choices" },
  { value: "ShortAnswer", label: "Short Answer" },
];

export const initQuestion = (examId: string, index: number) => ({
  examId: examId,
  answers: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
  type: questionTypeOptions[0].value,
  index: index,
});

export const examDurationOptions = [
  { value: -1, label: "unlimited" },
  { value: 10, label: "10m" },
  { value: 15, label: "15m" },
  { value: 30, label: "30m" },
  { value: 45, label: "45m" },
];
