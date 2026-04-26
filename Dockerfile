FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the project files
COPY . .

# Ensure the maven wrapper is executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the service port
EXPOSE 8080

# Run the compiled jar
CMD ["java", "-jar", "target/EventTicketingPlatform-0.0.1-SNAPSHOT.jar"]
