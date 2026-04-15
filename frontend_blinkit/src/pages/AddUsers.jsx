const reg = async () => {
  if (!name || !phone || !email || !password) {
    alert("Fill all fields");
    return;
  }

  // ✅ ADD THIS LINE HERE
  console.log("Sending data:", { name, phone, email, password });

  try {
    const res = await axios.post(
      "https://blinkit-2-yemv.onrender.com/register",
      { name, phone, email, password }
    );

    alert(res.data.message || "User Registered Successfully");

    setName("");
    setPhone("");
    setEmail("");
    setPassword("");

    navigate("/login");
  } catch (err) {
    console.log("FULL ERROR:", err);               // ✅ ADD
    console.log("BACKEND:", err.response?.data);   // ✅ ADD

    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Registration Failed");
    }
  }
};