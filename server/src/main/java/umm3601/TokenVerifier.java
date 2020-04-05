package umm3601;

import java.security.interfaces.RSAPublicKey;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.javalin.http.Context;

public class TokenVerifier {

    public TokenVerifier() {}


    // https://community.auth0.com/t/verify-jwt-token-received-from-auth0/35581/4
    public boolean verifyToken(Context ctx) {
        String token = ctx.header("Authorization").replace("Bearer ", "");
        System.err.println(token);
        JwkProvider provider = new UrlJwkProvider("https://dev-h60mw6th.auth0.com/");
        try {
            DecodedJWT jwt = JWT.decode(token);
            System.err.println("Made it here");
            Jwk jwk = provider.get(jwt.getKeyId());

            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

            JWTVerifier verifier = JWT.require(algorithm)
            .withIssuer("https://dev-h60mw6th.auth0.com/")
            .build();

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
}
