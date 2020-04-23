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
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.kevinsawicki.http.HttpRequest;

import io.javalin.http.Context;

public class TokenVerifier {


  public TokenVerifier() {
  }

  // https://community.auth0.com/t/verify-jwt-token-received-from-auth0/35581/4
  public boolean verifyToken(Context ctx) throws InterruptedException {
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

  public String getOwnerx500(Context ctx) {

    String token = ctx.header("Authorization");

    String userInfo = HttpRequest.get("https://dev-h60mw6th.auth0.com/userinfo").authorization(token).body();

    // Pull the x500 out of the body, there's definitely a better way to do this, but idk how
    System.err.println(userInfo);
    int startIndex = userInfo.indexOf("\"nickname\":\"");
    System.err.println(startIndex);
    String temp = userInfo.substring(startIndex + 12);
    System.err.println(temp);
    int endIndex = temp.indexOf('"');
    System.err.println(endIndex);
    String x500 = temp.substring(0, endIndex);

    return x500;
  }
}
