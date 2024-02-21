package com.reg;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

@WebServlet("/register")
public class reg extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uname = request.getParameter("name");
		String uemail = request.getParameter("email");
        String upass = request.getParameter("pass");
        Connection con = null;
		HttpSession session = request.getSession();
		RequestDispatcher dispatcher = null;
		
		if(uemail == null || uemail.equals("")) {
			request.setAttribute("status", "invalidEmail");
			dispatcher = request.getRequestDispatcher("login.jsp");
			dispatcher.forward(request, response);
		}
		if(upass == null || upass.equals("")) {
			request.setAttribute("status", "invalidPass");
			dispatcher = request.getRequestDispatcher("login.jsp");	
			dispatcher.forward(request, response);
		}
		try {

			Class.forName("com.mysql.jdbc.Driver");
		     con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shinestudio?useSSL=FALSE", "root", "Anjali@247");
			
			PreparedStatement pst = con.prepareStatement("insert into users (uname, upass, uemail) values(?,?,?)");
            pst.setString(1, uname);
            pst.setString(2, upass);
            pst.setString(3, uemail);

            int rowCount = pst.executeUpdate();
            dispatcher = request.getRequestDispatcher("registration.jsp");

            if (rowCount > 0){
                request.setAttribute("status" , "success");
            } else {
                request.setAttribute("status" , "failed");
            }
			dispatcher.forward(request, response);
		
	} catch (Exception e) {
		e.printStackTrace();
	} finally {
        try {
			con.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
	}
}


