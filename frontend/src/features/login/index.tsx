// import { useEffect, useState } from "react";
// import { postLogin, getAuthStatus } from "@/services/auth.service";
// import { useNavigate } from "react-router-dom";
// import { Text } from "@radix-ui/themes";
// import ReCAPTCHA from "react-google-recaptcha";

// export default function LoginFeature() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAuthStatus()
//       .then((response) => {
//         if (response.statusCode === 200) {
//           if (response.message == "User authenticated successfully") {
//             navigate("/");
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error checking authentication status:", error.message);
//       });
//   }, []);

//   const handleLogin = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!username) {
//       alert("Please enter a username.");
//       return;
//     }
//     if (!password) {
//       alert("Please enter a password.");
//       return;
//     }
//     if (!recaptchaToken) {
//       alert("Please complete the reCAPTCHA verification.");
//       return;
//     }

//     try {
//       postLogin({ username, password })
//         .then((response) => {
//           if (response.statusCode === 200) {
//             navigate("/");
//           } else {
//             alert(response.message);
//           }
//         })
//         .catch((error) => {
//           console.error("Login error:", error.message);
//           alert("Failed to log in. Please try again.");
//         });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
//       <h1 className="text-3xl font-bold text-gray-300 mb-4">MEMBER ONLY !</h1>
//       <div className="w-full max-w-sm p-8 bg-gray-300 rounded-md shadow-md">
//         <img
//           className="mx-auto mb-4 border rounded-md"
//           src="/images/supersixlogo.png"
//           alt="Logo"
//         />
//         <Text className="text-3xl font-bold text-gray-700 text-center mb-4">
//           Login
//         </Text>
//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username(ชื่อผู้ใช้)"
//             onChange={(event) => setUsername(event.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password(รหัสผ่าน)"
//             onChange={(event) => setPassword(event.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//           />

//           {/* reCAPTCHA */}
//           <ReCAPTCHA
//             sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//             onChange={(token) => setRecaptchaToken(token)}
//           />

//           <button
//             type="submit"
//             className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { postLogin, getAuthStatus } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { Text } from "@radix-ui/themes";
export default function LoginFeature() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAuthStatus()
      .then((response) => {
        if (response.statusCode === 200) {
          if(response.message == "User authenticated successfully"){
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.error("Error checking authentication status:", error.message);
      });
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!username) {
      alert("Please enter a username.");
      return;
    }
    if (!password) {
      alert("Please enter a password.");
      return;
    }
    try {
      postLogin({ username: username, password: password })
      .then((response) => {
        if (response.statusCode === 200) {
          console.log('test');
          
          navigate("/");
        } else if (response.statusCode === 400) {
          alert(response.message);
        } else {
          alert(`Unexpected error: ${response.message}`);
        }
      })
    } catch(error) {
        console.error(
          "Error creating category:",
          error.response?.data || error.message
        );
        alert("Failed to log in. Please try again.");
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gray-700">
      <h1 className="text-3xl font-bold text-gray-300 mx-auto mb-4 justify-left items-left flex-col flex">MEMBER ONLY !</h1>
      <div className="w-full max-w-sm p-8 bg-gray-300 rounded-md shadow-md">
      {/* <Avatar
              className="mx-auto mb-4 justify-center items-center flex-col flex"
              src="/images/supersixlogo.png"
              fallback={"/images/supersixlogo.png"}
              size={"9"}
            /> */}
            <img
				className="Image mx-auto mb-4 justify-center items-center flex-col flex border rounded-md"  
				src="/images/supersixlogo.png"
				alt="Landscape photograph by Tobias Tullius"
			/>
        <Text className="text-3xl font-bold text-gray-700 mx-auto mb-4 justify-center items-center flex-col flex">Login</Text>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            name="username"
            placeholder="Username(ชื่อผู้ใช้)"
            onChange={(event) => setUsername(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password(รหัสผ่าน)"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            // onClick={handleLogin}
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
{/* 
          <button
            disabled
            // onClick={handleLogin}
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gray-800 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button> */}


        </form>
      </div>
    </div>
  );
}

