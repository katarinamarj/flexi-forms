import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/FormResponse.css";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

const FormResponse = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [formName, setFormName] = useState("");
  const [fieldTypes, setFieldTypes] = useState({});
  const [view, setView] = useState("individual");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://localhost:8000/api/form-responses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setResponses(data);

        const formRes = await fetch(`https://localhost:8000/api/form-templates/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formData = await formRes.json();
        setFormName(formData.name);

        const typesMap = {};
        formData.fields.forEach((field) => {
          typesMap[field.label] = field.type;
        });
        setFieldTypes(typesMap);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  const getSummary = () => {
    const summary = {};
    responses.forEach((resp) => {
      for (const [question, answer] of Object.entries(resp.data)) {
        const type = fieldTypes[question];
        if (!summary[question]) summary[question] = { type, values: [] };
        if (Array.isArray(answer)) {
          summary[question].values.push(...answer);
        } else {
          summary[question].values.push(answer);
        }
      }
    });
    return summary;
  };

  const countAnswers = (answers) => {
    const counts = {};
    answers.forEach((ans) => {
      if (Array.isArray(ans)) {
        ans.forEach((item) => {
          counts[item] = (counts[item] || 0) + 1;
        });
      } else {
        counts[ans] = (counts[ans] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

 const handlePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
    window.scrollTo(0, 0); 
  }
 };

  const handleNext = () => {
    if (currentIndex < responses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo(0, 0); 
    }
  };

  return (
    <div>
      <Header />

      <div className="form-responses-container">
        <div className="responses-header">
          <h2>
            {formName} – {responses.length} response
            {responses.length !== 1 ? "s" : ""}
          </h2>
        </div>

        <div className="view-buttons">
          <button
            className={view === "individual" ? "active" : "inactive"}
            onClick={() => setView("individual")}
          >
            Individual
          </button>
          <button
            className={view === "summary" ? "active" : "inactive"}
            onClick={() => setView("summary")}
          >
            Summary
          </button>
        </div>

        <div className="responses-section">
          {responses.length === 0 ? (
            <p className="no-responses">No responses yet.</p>
          ) : view === "individual" ? (
            <div className="response-block">
              <p className="submitted-at">
                <strong>Submitted at:</strong> {responses[currentIndex].submittedAt}
              </p>
              {Object.entries(responses[currentIndex].data).map(
                ([question, answer], index) => (
                  <div key={index} className="question-block">
                    <strong>{question}</strong>
                    <p>{Array.isArray(answer) ? answer.join(", ") : answer}</p>
                  </div>
                )
              )}

              <div className="navigation-buttons">
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                  ← Previous
                </button>
                <span>
                  {currentIndex + 1} / {responses.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === responses.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            Object.entries(getSummary()).map(([question, { type, values }], index) => {
              const shouldChart = ["checkbox", "radio", "dropdown"].includes(type);
              const data = countAnswers(values);

              return (
                <div key={index} className="question-block">
                  <strong>{question}</strong>
                  {shouldChart ? (
                    <ResponsiveContainer width="100%" height={300}>
                      {data.length <= 5 ? (
                        <PieChart>
                          <Pie dataKey="value" data={data} label>
                            {data.map((entry, idx) => (
                              <Cell
                                key={`cell-${idx}`}
                                fill={COLORS[idx % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      ) : (
                        <BarChart data={data}>
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  ) : (
                    <ul>
                      {values.map((val, idx) => (
                        <li key={idx}>
                          {Array.isArray(val) ? val.join(", ") : val}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FormResponse;
