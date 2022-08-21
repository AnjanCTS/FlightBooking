package com.flightapp.airportmodule.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "AirportModule",
                version = "v2.0"
        ),
        servers = @Server(url = "http://localhost:9002")
)
public class OpenAPIConfig {
}
