// src/pages/HelpPage.jsx
export default function HelpPage() {
  const helplines = [
    { name: "National Helpline", phone: "9152987821" },
    { name: "Student Helpline", phone: "1800-233-3330" },
    { name: "Counsellor Support", phone: "080-4600-0812" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Need Help?</h1>
      <p className="mb-4 text-gray-600">
        You are not alone 💙. Here are some helplines and support contacts:
      </p>

      <ul className="space-y-3">
        {helplines.map((h, i) => (
          <li
            key={i}
            className="border p-3 rounded-lg flex justify-between items-center"
          >
            <span className="font-medium">{h.name}</span>
            <a
              href={`tel:${h.phone}`}
              className="text-blue-500 hover:underline"
            >
              {h.phone}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
