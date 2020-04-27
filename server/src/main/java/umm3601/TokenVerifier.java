package umm3601;

import java.security.interfaces.RSAPublicKey;
import java.util.concurrent.TimeUnit;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.kevinsawicki.http.HttpRequest;

import io.javalin.http.Context;

public class TokenVerifier {


  public TokenVerifier() {
  }

  /**
   * Given a context containing an Access JWT, verify said token
   * Based on the code from https://community.auth0.com/t/verify-jwt-token-received-from-auth0/35581/4
   * @param ctx the context containing the JWT
   * @return true if the token is successfully verified
   * Sets context status to 400 if there is an error
   */
  public boolean verifyToken(Context ctx) {
    String token = ctx.header("Authorization").replace("Bearer ", "");
    JwkProvider provider = new UrlJwkProvider("https://dev-h60mw6th.auth0.com/");
    try {
      DecodedJWT jwt = JWT.decode(token);
      Jwk jwk = provider.get(jwt.getKeyId());

      Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

      JWTVerifier verifier = JWT.require(algorithm).withIssuer("https://dev-h60mw6th.auth0.com/").acceptLeeway(1).build();

      jwt = verifier.verify(token);


      return true;

    } catch (JWTVerificationException e) {
      // Invalid signature/claims
      ctx.status(400);
      e.printStackTrace();
    } catch (JwkException e) {
      ctx.status(400);
      e.printStackTrace();
    }

    return false;
  }

  /**
   * Retrieve the subject from a context containing an Access JWT
   * Note: The method assumes that the context has been verified
   * @param ctx the context containing the JWT
   * @return the subject of the JWT as a string
   */
  public String getSubFromToken(Context ctx) {
    String token = ctx.header("Authorization").replace("Bearer ", "");
    String tokenAsString = null;

    try {
      DecodedJWT jwt = JWT.decode(token);
      tokenAsString = jwt.getSubject();
    } catch (JWTDecodeException e) {
      ctx.status(400);
      e.printStackTrace();
    }

    return tokenAsString;
  }

  /**
   * Calls Auth0 to get a user's info
   * @param ctx a context containing an Access JWT given to the user who's info is desired
   * @return the info as a string
   */
  public String getUserInfo(Context ctx) {
    String token = ctx.header("Authorization");

    String userInfo = HttpRequest.get("https://dev-h60mw6th.auth0.com/userinfo").authorization(token).body();

    return userInfo;
  }

  /**
   * Parses out the nickname from a given user's info
   * @param userInfo the user's info as a string
   * @return the user's x500 as a string
   */
  public String getNewOwnerx500(String userInfo) {

    // Pull the x500 out of the body, there's definitely a better way to do this, but idk how
    System.err.println(userInfo);
    int startIndex = userInfo.indexOf("\"nickname\":\"");
    System.err.println(startIndex);
    String temp = userInfo.substring(startIndex + 12);
    System.err.println(temp);
    int endIndex = temp.indexOf('"');
    System.err.println(endIndex);
    String x500 = temp.substring(0, endIndex);
    System.err.println(x500);

    return x500;
  }

  /**
   * Parses out the subject from a given user's info
   * @param userInfo the user's info as a string
   * @return the sub as a string
   */
  public String getNewOwnerSub(String userInfo) {

    System.err.println(userInfo);
    int startIndex = userInfo.indexOf("\"sub\":\"");
    System.err.println(startIndex);
    String temp = userInfo.substring(startIndex + 7);
    System.err.println(temp);
    int endIndex = temp.indexOf('"');
    System.err.println(endIndex);
    String sub = temp.substring(0, endIndex);
    System.err.println(sub);

    return sub;
  }
}
