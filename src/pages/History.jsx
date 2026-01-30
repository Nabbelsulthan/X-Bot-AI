import sampleData from "../data/sampleData.json";

export default function History() {
  return (
    <>
      <h2>Conversation History</h2>
      {sampleData.map((c, i) => (
        <div key={i}>
          <p><strong>You:</strong> {c.question}</p>
          <p><strong>Soul AI:</strong> {c.answer}</p>
          <p>Rating: {c.rating}</p>
          <p>Feedback: {c.feedback}</p>
        </div>
      ))}
    </>
  );
}
