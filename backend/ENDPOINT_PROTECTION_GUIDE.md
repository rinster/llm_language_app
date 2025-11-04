# Endpoint Protection Guide

## How Endpoints Are Protected

Your endpoints are already protected by Spring Security configuration in `SecurityConfig.java`. Here are the different ways to protect endpoints:

## 1. Global Protection (Current Setup)

All endpoints are protected by default except public ones defined in `SecurityConfig`:

```java
// In SecurityConfig.java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()      // Public
    .requestMatchers("/api/categories/**").permitAll() // Public
    .anyRequest().authenticated()                       // All others require JWT token
)
```

**What this means:**
- `/api/auth/**` - Public (no token needed)
- `/api/categories/**` - Public (no token needed)
- **All other endpoints** - Require valid JWT token in Authorization header

## 2. Method-Level Protection with @PreAuthorize

You can add additional security annotations to individual methods:

```java
@GetMapping
@PreAuthorize("isAuthenticated()")  // Just requires authentication
public Iterable<UserDto> getAllUsers() {
    // ...
}

@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")  // Requires ADMIN role (when roles are implemented)
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    // ...
}
```

**Available expressions:**
- `isAuthenticated()` - User must be authenticated
- `hasRole('ROLE_NAME')` - User must have specific role
- `hasAnyRole('ROLE1', 'ROLE2')` - User must have one of the roles
- `#id == authentication.principal.id` - Custom expressions

## 3. Accessing Current User in Controllers

### Option A: Get User ID from JWT Token (Recommended)

```java
@PutMapping("/{id}")
public ResponseEntity<UserDto> updateUser(
        @PathVariable Long id,
        @RequestBody UpdateUserRequest request,
        HttpServletRequest httpRequest) {
    
    // Get current user ID from token
    Long currentUserId = getCurrentUserId(httpRequest);
    
    // Ensure user can only update their own profile
    if (currentUserId == null || !currentUserId.equals(id)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    // ... rest of the method
}
```

### Option B: Use SecurityUtils Helper

```java
import com.teamEleven.backend.utils.SecurityUtils;

@GetMapping("/profile")
public ResponseEntity<UserDto> getCurrentUserProfile() {
    String email = SecurityUtils.getCurrentUserEmail();
    if (email == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    // Find user by email and return
    // ...
}
```

### Option C: Get from SecurityContext

```java
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@GetMapping("/me")
public ResponseEntity<String> getCurrentUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String email = (String) auth.getPrincipal(); // Email from JWT
    return ResponseEntity.ok(email);
}
```

## 4. Protecting Specific Endpoints

### Example: Only allow users to update their own profile

```java
@PutMapping("/{id}")
public ResponseEntity<UserDto> updateUser(
        @PathVariable Long id,
        @RequestBody UpdateUserRequest request,
        HttpServletRequest httpRequest) {
    
    // Check if user is trying to update their own profile
    Long currentUserId = getCurrentUserId(httpRequest);
    if (currentUserId == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    if (!currentUserId.equals(id)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    // ... update logic
}
```

### Example: Admin-only endpoint

```java
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id, HttpServletRequest request) {
    Long currentUserId = getCurrentUserId(request);
    
    // Only allow if user is admin or deleting their own account
    // (You'll need to add role checking when roles are implemented)
    if (currentUserId == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    // ... deletion logic
}
```

## 5. Making New Endpoints Public

To make a new endpoint public, add it to `SecurityConfig.java`:

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/categories/**").permitAll()
    .requestMatchers("/api/public/**").permitAll()  // Add new public path
    .anyRequest().authenticated()
)
```

## 6. Testing Protected Endpoints

### In Postman:

1. **Get a token** (if you don't have one):
   ```
   POST http://localhost:8080/api/auth/login
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. **Use the token** in protected endpoints:
   - Go to Authorization tab
   - Select "Bearer Token"
   - Paste your token

   OR add header manually:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

## Summary

- **Default**: All endpoints require JWT token (except `/api/auth/**` and `/api/categories/**`)
- **Method-level**: Use `@PreAuthorize` for additional checks
- **User ownership**: Check `currentUserId` to ensure users can only access their own resources
- **Public endpoints**: Add to `SecurityConfig.java` `permitAll()` list

