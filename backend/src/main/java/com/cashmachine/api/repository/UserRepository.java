package com.cashmachine.api.repository;

import com.cashmachine.api.model.User;

import java.sql.*;

public class UserRepository {
    private Connection connection;

    public UserRepository(Connection connection) {
        this.connection = connection;
    }

    public User findById(int id) throws SQLException {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("account_type"),
                    rs.getString("account_level"),
                    rs.getDouble("balance"),
                    rs.getString("password")
                );
            }
        }

        return null;
    }

    public User findByName(String name) throws SQLException {
        String sql = "SELECT * FROM users WHERE name = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, name);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("account_type"),
                    rs.getString("account_level"),
                    rs.getDouble("balance"),
                    rs.getString("password")
                );
            }
        }

        return null;
    }

    public void save(User user) throws SQLException {
        String sql = "INSERT INTO users (name, account_type, account_level, balance, password) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getAccountType());
            pstmt.setString(3, user.getAccountLevel());
            pstmt.setDouble(4, user.getBalance());
            pstmt.setString(5, user.getPassword());
            pstmt.executeUpdate();
        }
    }
}
