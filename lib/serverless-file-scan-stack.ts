import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { ServerlessClamscan } from 'cdk-serverless-clamscan';

export class ServerlessFileScanStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bkt = new s3.Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, 'BucketName', {
      value: bkt.bucketName
    });
    new ServerlessClamscan(this, 'ClamScan', {
      buckets: [bkt]
    });
  }
}
