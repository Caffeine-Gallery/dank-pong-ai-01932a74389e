using UnityEngine;

public class PongGame : MonoBehaviour
{
    public Transform playerPaddle;
    public Transform aiPaddle;
    public Transform ball;
    public float paddleSpeed = 10f;
    public float ballSpeed = 5f;
    private Vector3 ballDirection;

    void Start()
    {
        ballDirection = new Vector3(1, 0, 0).normalized;
        ball.GetComponent<Rigidbody>().velocity = ballDirection * ballSpeed;
    }

    void Update()
    {
        HandlePlayerInput();
        MoveAIPaddle();
    }

    void HandlePlayerInput()
    {
        float move = Input.GetAxis("Vertical") * paddleSpeed * Time.deltaTime;
        playerPaddle.position += new Vector3(0, move, 0);
    }

    void MoveAIPaddle()
    {
        if (ball.position.y > aiPaddle.position.y)
        {
            aiPaddle.position += new Vector3(0, paddleSpeed * Time.deltaTime, 0);
        }
        else if (ball.position.y < aiPaddle.position.y)
        {
            aiPaddle.position -= new Vector3(0, paddleSpeed * Time.deltaTime, 0);
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ball"))
        {
            ballDirection.x = -ballDirection.x;
            ball.GetComponent<Rigidbody>().velocity = ballDirection * ballSpeed;
        }
    }
}
