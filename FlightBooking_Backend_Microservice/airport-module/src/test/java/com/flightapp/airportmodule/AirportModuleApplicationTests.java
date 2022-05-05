package com.flightapp.airportmodule;

import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AirportModuleApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void contextLoads() throws JSONException {

		String response = this.restTemplate.getForObject("/airport/307",String.class);

		assertEquals("{\"airportCode\":\"307\",\"airportState\":\"MAHARASHTRA\",\"airportName\":\"PUN\"}",response);

		JSONAssert.assertEquals("{\"airportCode\":\"307\",\"airportState\":\"MAHARASHTRA\",\"airportName\":\"PUN\"}",response , false);




	}

}
